import React from "react";
import axios from "axios";
import '../componentsCss/alluser.css'
import { useState } from "react";
import { useEffect } from "react";

const Daily = ({ DDay }) => {

    const [projects, setProjects] = useState([]);


    const [SelectedProject, setSelectedProject] = useState(DDay.ProjectName)
    const [Task, setTask] = useState(DDay.Task)
    const [Timed, setTimed] = useState(DDay.Timed)
    const [TimeF, setTimeFinsih] = useState(DDay.TimeF);
    const [Location, setLocation] = useState(DDay.Location);
    const [VehiclePrice, setVehiclePrice] = useState(DDay.VehiclePrice);
    const [TypeJ, setTypeJ] = useState(DDay.TypeJ);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    useEffect(() => {

        axios.get('http://127.0.0.1:3000/project/allprojects')
            .then((res) => {
                const filteredProjects = res.data.filter(project => project.Status === false);
                setProjects(filteredProjects);
                console.log(filteredProjects)
            })
            .catch(error => console.error(error));

    }, []);


    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError('');
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
        }
        if (success) {
            const timeout = setTimeout(() => {
                setSuccess('');
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
        }


    }, [error, success]);

    const handleTypeJChange = (event) => {
        setTypeJ(event.target.value);
    };
    const handleProjectChange = (event) => {
        const selectedProject = event.target.value;
        setSelectedProject(selectedProject);
    };




    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedDaySheet = {
            UserId: DDay.UserId,
            date: DDay.date,
            Monthlysheetid: DDay.Monthlysheetid,
            TypeJ: TypeJ,
            Location: Location,
            ProjectName: SelectedProject,
            Timed: Timed,
            TimeF: TimeF,
            VehiclePrice: VehiclePrice,
            Task: Task
        };

        try {
            const response = await axios.put(`http://127.0.0.1:3000/DailySheet/updateDay/${DDay._id}`, updatedDaySheet);
            const data = response.data;
            console.log(data);
            setSuccess('Updated Successfully');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };


    return (<div>


        {success && <span className="error4 animated tada">{success}</span>}
        {error && <span className="error5 animated tada">{error}</span>}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <span className="Picon">
                    <i className="fa fa-briefcase"></i>
                </span>
                <label for="pickup_time">Tyoe of Day</label>
                <select name="pickup_place" id="pickup_place" s value={TypeJ} onChange={handleTypeJChange} class="datepicker-here form-control" >
                    <option value="" selected disabled>Select New</option>
                    <option value="Working">Working</option>
                    <option value="DayOff">DayOff</option>
                    <option value="Holiday">Holiday </option>
                </select>
                <label htmlFor="projectName">Project Name</label>
                <span className="Picon1">
                    <i className="fa fa-laptop"></i>
                </span>
                <select
                    className="form-control"
                    id="projectName"
                    value={SelectedProject}
                    onChange={handleProjectChange}
                >
                    <option value="">--Select Project--</option>
                    {projects.map(project => (
                        <option key={project._id} value={project.ProjectName} >{project.ProjectName}</option>
                    ))}
                </select>

                <span className="Picon2">
                    <i className="fa fa-tasks"></i>
                </span>
                <label htmlFor="task">Task</label>
                <input
                    type="text"
                    className="form-control"
                    id="task"
                    placeholder={DDay.Task}
                    value={Task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <span className="Picon3">
                    <i className="fa fa-clock"></i>
                </span>

                <label htmlFor="timed">Time Start</label>
                <input
                    type="time"
                    className="form-control"
                    id="timed"
                    value={Timed}
                    onChange={(event) => setTimed(event.target.value)}
                />

                <span className="Picon4">
                    <i className="fa fa-clock"></i>
                </span>
                <label htmlFor="timeF">Time Finish</label>
                <input
                    type="time"
                    className="form-control"
                    id="timeF"
                    value={TimeF}
                    onChange={(event) => setTimeFinsih(event.target.value)}
                    step="60"
                    format="HH:mm"
                />

                <span className="Picon5">
                    <i className="fa fa-home"></i>
                </span>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder={DDay.Location}
                    value={Location}
                    onChange={(event) => setLocation(event.target.value)}
                />

                <span className="Picon6">
                    <i className="fa fa-taxi"></i>
                </span>

                <label htmlFor="vehiclePrice">Vehicle Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="vehiclePrice"
                    placeholder={`${DDay.VehiclePrice} DT`}
                    value={VehiclePrice}
                    onChange={(event) => setVehiclePrice(event.target.value)}
                />
            </div>
            <input type="submit" value="Update" className="updatebtn" />

        </form>




    </div >

    )
}



export default Daily;