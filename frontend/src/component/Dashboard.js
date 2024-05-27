import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({ auth: { user } }) => {
    const [projects, setProjects] = React.useState([]);

    const handleAddProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: `Project ${projects.length + 1}`
        };
        setProjects([...projects, newProject]);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <aside className="bg-gray-800 text-white p-4 w-full md:w-64">
                <ul>
                    <li className="mb-4"><strong><a href="#" className="text-white">Admin</a></strong></li> {/* Changed from Dashboard to Admin */}
                    <li className="mb-4"><a href="#" className="text-white">Manage Users</a></li>
                    <li className="mb-4"><a href="#" className="text-white">Create Project</a></li>
                    <li className="mb-4"><a href="#" className="text-white">Create Task</a></li>
                    <li className="mb-4"><a href="#" className="text-white">Logout</a></li>
                </ul>
            </aside>
            <main className="flex-1 p-8">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2> {/* Changed from Dashboard to Admin */}
                    <p className="text-xl mb-4"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                    <p className="mb-4">This is your project management dashboard.</p>

                    {projects.length === 0 ? (
                        <div className="text-center">
                            <p className="text-lg mb-4">You have no projects. Click below to add a new project.</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleAddProject}
                            >
                                Add Project
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold mb-4">Your Projects</h3>
                            <ul>
                                {projects.map(project => (
                                    <li key={project.id} className="mb-2">
                                        {project.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
