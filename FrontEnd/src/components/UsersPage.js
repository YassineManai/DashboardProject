
import Side from "../secondary -components/sidebar"
import { useRef } from "react";
const UsersPage = () => {

    const sidebar = useRef(null);
    const menubar = useRef(null)
    function handleMenuClick() {

        sidebar.current.classList.toggle('hide')
        console.log('test')
    }
    return (
        <div>
             <section id="sidebar" ref={sidebar} className="show" >
                <Side />
            </section>
            <section ref={menubar} id="content">
                <nav>
                    <i className='bx bx-menu' onClick={handleMenuClick}></i>
                    <a href="#" className="nav-link">Categories</a>
                    <form action="#">
                        <div className="form-input">
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label for="switch-mode" className="switch-mode"></label>

                    <a href="#" className="notification">
                        <i className='bx bxs-bell' ></i>
                        <span className="num">8</span>
                    </a>
                    <a href="#" className="profile">
                        <img src="img/people.png" />
                    </a>

                </nav>



                <main>
                    
           HALLLO USER
                  
                </main>

            </section>

          

        </div>
    )
}
export default UsersPage