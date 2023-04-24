import "./app-info.css";

const AppInfo = ({increased,employees}) => {
    return (
        <div className="app-info">
            <h1>List of employees in Company</h1>
            <h2>Total numer of employees: {employees}</h2>
            <h2>Will reciave bonus:{increased}</h2>
        </div>
    )
}

export default AppInfo;