import Nav from "../secondary -components/nav"
import Side from "../secondary -components/sidebar"
const UsersPage = () => {
    return (
        <div>

            <div >
                <Side />



                <section id="content">

                    <Nav />




                    <main>
                        <div className="head-title">
                            <div className="left">
                                <h1>Dashboard</h1>
                                <ul className="breadcrumb">
                                    <li>
                                        <a href="#">Dashboard</a>
                                    </li>
                                    <li><i className='bx bx-chevron-right' ></i></li>
                                    <li>
                                        <a className="active" href="#">Home</a>
                                    </li>
                                </ul>
                            </div>
                            <a href="#" className="btn-download">
                                <i className='bx bxs-cloud-download' ></i>
                                <span className="text">Download PDF</span>
                            </a>
                        </div>
                        <p> Hello Users </p>






                    </main>

                </section>

            </div>

        </div>
    )
}
export default UsersPage