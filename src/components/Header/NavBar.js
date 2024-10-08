import { Link } from "react-router-dom";
import TopLink from "./TopLink";
import { useEffect, useState } from "react";

const NavBar = () => {  
  
    
    const [categories,setCategories] = useState([]);
    const getCategories = async ()=>{
        const rs = await fetch("https://dummyjson.com/products/categories");
        const data = await rs.json();
        setCategories(data);
    }
    useEffect(()=>{
        getCategories();
    },[]);
    return (
    <div className="container-fluid " data-wow-delay="0.1s">
        <TopLink/>
        <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
            <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
                <h1 className="fw-bold text-primary m-0">F<span className="text-secondary">oo</span>dy</h1>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link active">Home</Link>   
                    <Link to="/bar" className="nav-item nav-link active">Bar</Link>
                    <Link to="/watertank" className="nav-item nav-link active">Water Tank</Link>
                    <Link to="/scadaview" className="nav-item nav-link active">Scada View</Link>
                    <Link to ="/chart" className="nav-item nav-link active">Chart</Link>
                    <Link to ="/animation" className="nav-item nav-link active">Animation</Link>     
                    <Link to="/products" className="nav-item nav-link">Products</Link>
                    {/* <Link to="/fan" className="nav-item nav-link">Fan</Link>
                    {
                        categories.map((item,key)=>{
                            return <Link key={key} to={"/category/"+item.slug} className="nav-item nav-link">{item.name}</Link>
                        })
                    } */}
                    
             
                   
                </div>
                <div className="d-none d-lg-flex ms-2">
                    <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                        <small className="fa fa-search text-body"></small>
                    </a>
                    <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                        <small className="fa fa-user text-body"></small>
                    </a>
                    <a className="btn-sm-square bg-white rounded-circle ms-3" href="">
                        <small className="fa fa-shopping-bag text-body"></small>
                    </a>
                </div>
            </div>
        </nav>
    </div>
        )
}

export default NavBar;