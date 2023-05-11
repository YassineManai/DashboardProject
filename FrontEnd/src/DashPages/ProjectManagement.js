import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';


const ProjectManagement = () => {
    const [taskData, setTaskData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const today = new Date().toISOString().slice(0, 7);
    const [year] = startDate.split("-");
    const monthName = new Date(startDate).toLocaleString('default', { month: 'long' });


    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);



    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        setStartDate(today)
    }, []);

    console.log(startDate)
    
    useEffect(() => {

        // Fetch task data
      

        const fetchTaskData = async () => {

            const response = await fetch('http://localhost:3000/task/allTasks');
            const data = await response.json();
            const filteredUserIds = userData.map(user => user.Id);
            const filteredData = data.filter(task => (task.Month === monthName) && (task.Year == year) && (filteredUserIds.includes(task.UserId)));
            setTaskData(filteredData);
            setLoading(false); // set loading to false after receiving response
            console.log(filteredData)
        };
        fetchTaskData();
        
    }, [startDate ,userData]);

    useEffect(() => {
        const fetchUsers = async (searchTerm) => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/user/allusers');
                // Add the Id property to each user object in the array
                const usersWithId = response.data.map(user => ({ ...user, Id: user._id }));
                // Filter the users array by first name if a search term is provided
                const filteredUsers = searchTerm
                    ? usersWithId.filter(user => user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()))
                    : usersWithId;
                setUserData(filteredUsers);
                setLoading(false); // set loading to false after receiving response
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchUsers(searchTerm);
    }, [searchTerm]);

    // Extract unique project names from task data
    const projectNames = [...new Set(taskData.map(task => task.ProjectName))];

    // Generate table rows for each user
    const tableRows = taskData.reduce((rows, task) => {
        const { UserId, ProjectName, TotlHours } = task;
        const user = userData.find(user => user._id === UserId);
        const userName = user ? `${user.FirstName} ${user.LastName}` : '';
        const userRowIndex = rows.findIndex(row => row.userName === userName);
        if (userRowIndex === -1) {
            // Create a new row for this user
            rows.push({ userName, projects: { [ProjectName]: TotlHours }, totalHours: TotlHours });
        } else {
            // Add total hours for this project to existing row for this user
            const projects = rows[userRowIndex].projects;
            projects[ProjectName] = (projects[ProjectName] || 0) + TotlHours;
            rows[userRowIndex].totalHours += TotlHours;
        }
        return rows;
    }, []);

    // Generate table columns for each project
    const projectColumns = projectNames.map((projectName, columnIndex) => {
        const totalHours = taskData.reduce(
            (sum, task) => (task.ProjectName === projectName ? sum + task.TotlHours : sum),
            0
        );
        return <td key={`project-${columnIndex}`}>{totalHours}</td>;
    });










    const exportToExcel = () => {
        const flattenedRows = tableRows.reduce((flattened, row) => {
            const flatProjects = {};
            projectNames.forEach((projectName) => {
                flatProjects[projectName] = row.projects[projectName] || 0;
            });
            flattened.push({ userName: row.userName, ...flatProjects, totalHours: row.totalHours });
            return flattened;
        }, []);

        const worksheet = XLSX.utils.json_to_sheet(flattenedRows);

        // Add a new row for the total project hours
        const projectHoursRow = projectNames.map((projectName, columnIndex) => {
            const totalHours = taskData.reduce(
                (sum, task) => (task.ProjectName === projectName ? sum + task.TotlHours : sum),
                0
            );
            return totalHours;
        });
        projectHoursRow.unshift('Total Project Hours');
        XLSX.utils.sheet_add_aoa(worksheet, [projectHoursRow], { origin: -1 });

        XLSX.utils.sheet_add_aoa(worksheet, [['', ...projectNames]], { origin: 0 });
        flattenedRows.forEach((row, rowIndex) => {
            const userHoursRow = Object.values(row).slice(1);
            XLSX.utils.sheet_add_aoa(worksheet, [[row.userName, ...userHoursRow]], { origin: rowIndex + 1 });
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Productivity_report.xlsx");
    };


    return (
        <div>
            {
                loading ? (<span className="loader" > </span >)
                    : (
                        <>
                            <div className="head-title">
                                <div className="left">
                                    <h1>  SBS Time Tracking</h1>
                                    <ul className="breadcrumb">
                                        <li>
                                            <a href="#">Dashboard</a>
                                        </li>
                                        <li>
                                            <i className="bx bx-chevron-right"></i>
                                        </li>
                                        <li>
                                            <a className="active" href="#">
                                                SBS Time Tracking
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <a >
                                    <span htmlFor="start">Pick a Date</span> <br></br>
                                    <input
                                        type="month"
                                        id="start"
                                        name="start"
                                        min="2018-03"
                                        defaultValue={today}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </a>

                            </div>
                            <div className="table-data">
                                <div className="order">
                                    <div className="head">
                                        <h3> Users Productivity and Total Hours Spent</h3>


                                        <i >
                                            <form action="" class="search-bar">
                                                <input
                                                    type="search"
                                                    name="search"
                                                    pattern=".*\S.*"
                                                    required
                                                    value={searchTerm}
                                                    onChange={handleSearchTermChange}
                                                />
                                                <button class="search-btn" type="submit">
                                                    <span>Search</span>
                                                </button>
                                            </form>
                                        </i>
                                    </div>
                                    <div className="table-wrapper">
                                        <table className="fl-table">
                                            <thead>
                                                <tr>
                                                    <th  >Users / Projects</th>
                                                    {projectNames.map((projectName, index) => (
                                                        <th style={{ background: "#144CCC" }} key={index}>{projectName}</th>
                                                    ))}
                                                    <th  > Total User Hours</th>
                                                </tr>
                                                {tableRows.map((row, rowIndex) => (
                                                    <tr key={`user-${rowIndex}`}>
                                                        <th style={{ background: "#144CCC" }} >{row.userName}</th>
                                                        {projectNames.map((projectName, columnIndex) => (
                                                            <td key={`user-${rowIndex}-project-${columnIndex}`}>
                                                                {row.projects[projectName] || 0}
                                                            </td>
                                                        ))}
                                                        <td>{row.totalHours}</td>
                                                    </tr>
                                                ))}
                                                <tr key="total-project-row">
                                                    <th   >Total Project Hours</th>
                                                    {projectColumns}
                                                    <td>
                                                        {projectNames.reduce((sum, projectName) => {
                                                            const projectHours = taskData.reduce(
                                                                (projectSum, task) =>
                                                                    task.ProjectName === projectName ? projectSum + task.TotlHours : projectSum,
                                                                0
                                                            );
                                                            return sum + projectHours;
                                                        }, 0)}
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <a className='exel' >
                                        <i class='bx bxs-cloud-download' ></i>
                                        <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={exportToExcel} class="text">Download Results</span>

                                    </a>
                                </div>

                            </div>
                        </>
                    )}
        </div>
    );
};

export default ProjectManagement;