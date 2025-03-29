import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

const empleadosIniciales = [
    { 
        id: 1, 
        nombre: "Jorge Carranza", 
        empresa: "Tec", 
        puesto: "Desarrollador Frontend",
        expertise: "React, JavaScript",
        edad: 32,
        email: "jorge@tec.com",
        telefono: "5551234567"
    },
    { 
        id: 2, 
        nombre: "Ramon Velez", 
        empresa: "Banorte", 
        puesto: "Analista Financiero",
        expertise: "Análisis de datos, Excel",
        edad: 28,
        email: "ramon@banorte.com",
        telefono: "5559876543"
    },

    { 
        id: 3, 
        nombre: "Hugo Sanchez", 
        empresa: "Real Madrid", 
        puesto: "Entrenador",
        expertise: "Fútbol, Estrategia",
        edad: 45,
        email: "hugo@realmadrid.com",
        telefono: "5554567890"
    },
];

class EmpleadosManager extends React.Component {
    state = {
        empleados: empleadosIniciales,
        modalEditar: false,
        modalAgregar: false,
        empleadoSeleccionado: {
            id: "",
            nombre: "",
            empresa: "",
            puesto: "",
            expertise: "",
            edad: "",
            email: "",
            telefono: ""
        },
    };

    mostrarModalEditar = (empleado) => {
        this.setState({
            empleadoSeleccionado: empleado,
            modalEditar: true,
        });
    };

    cerrarModalEditar = () => {
        this.setState({ modalEditar: false });
    };

    mostrarModalAgregar = () => {
        this.setState({
            empleadoSeleccionado: { 
                id: "", 
                nombre: "", 
                empresa: "", 
                puesto: "", 
                expertise: "", 
                edad: "", 
                email: "", 
                telefono: "" 
            },
            modalAgregar: true,
        });
    };

    cerrarModalAgregar = () => {
        this.setState({ modalAgregar: false });
    };

    actualizarEmpleado = () => {
        const { empleados, empleadoSeleccionado } = this.state;
        const empleadosActualizados = empleados.map(empleado => 
            empleado.id === empleadoSeleccionado.id ? empleadoSeleccionado : empleado
        );
        
        this.setState({ 
            empleados: empleadosActualizados,
            modalEditar: false 
        });
    };

    eliminarEmpleado = (empleado) => {
        const confirmacion = window.confirm(
            `¿Estás seguro que deseas eliminar a ${empleado.nombre}?`
        );
        if (confirmacion) {
            const empleadosFiltrados = this.state.empleados.filter(
                emp => emp.id !== empleado.id
            );
            this.setState({ empleados: empleadosFiltrados });
        }
    };

    agregarEmpleado = () => {
        const { empleados, empleadoSeleccionado } = this.state;
        const nuevoId = empleados.length > 0 ? Math.max(...empleados.map(e => e.id)) + 1 : 1;
        
        const nuevoEmpleado = {
            ...empleadoSeleccionado,
            id: nuevoId
        };
        
        this.setState({ 
            empleados: [...empleados, nuevoEmpleado],
            modalAgregar: false 
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            empleadoSeleccionado: {
                ...prevState.empleadoSeleccionado,
                [name]: value
            }
        }));
    };

    render() {
        const { empleados, empleadoSeleccionado, modalEditar, modalAgregar } = this.state;

        return (
            <Container className="mt-5">
                <h1 className="text-center mb-4">Gestión de Empleados</h1>
                
                <Button color="success" onClick={this.mostrarModalAgregar} className="mb-4">
                    Agregar Empleado
                </Button>
                
                <Table striped bordered responsive>
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Puesto</th>
                            <th>Expertise</th>
                            <th>Edad</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(empleado => (
                            <tr key={empleado.id}>
                                <td>{empleado.id}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.empresa}</td>
                                <td>{empleado.puesto}</td>
                                <td>{empleado.expertise}</td>
                                <td>{empleado.edad}</td>
                                <td>{empleado.email}</td>
                                <td>{empleado.telefono}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => this.mostrarModalEditar(empleado)}
                                        className="mr-2"
                                    >
                                        Editar
                                    </Button>
                                    {' '}
                                    <Button
                                        color="danger"
                                        onClick={() => this.eliminarEmpleado(empleado)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal isOpen={modalAgregar} toggle={this.cerrarModalAgregar}>
                    <ModalHeader toggle={this.cerrarModalAgregar}>
                        Agregar Nuevo Empleado
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.nombre}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Empresa:</label>
                            <input
                                className="form-control"
                                name="empresa"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.empresa}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Puesto:</label>
                            <input
                                className="form-control"
                                name="puesto"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.puesto}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Expertise:</label>
                            <input
                                className="form-control"
                                name="expertise"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.expertise}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Edad:</label>
                            <input
                                className="form-control"
                                name="edad"
                                type="number"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.edad}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email:</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.email}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Teléfono:</label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="tel"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.telefono}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.agregarEmpleado}>
                            Guardar
                        </Button>
                        <Button color="secondary" onClick={this.cerrarModalAgregar}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEditar} toggle={this.cerrarModalEditar}>
                    <ModalHeader toggle={this.cerrarModalEditar}>
                        Editar Empleado
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>ID:</label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={empleadoSeleccionado.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.nombre}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Empresa:</label>
                            <input
                                className="form-control"
                                name="empresa"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.empresa}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Puesto:</label>
                            <input
                                className="form-control"
                                name="puesto"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.puesto}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Expertise:</label>
                            <input
                                className="form-control"
                                name="expertise"
                                type="text"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.expertise}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Edad:</label>
                            <input
                                className="form-control"
                                name="edad"
                                type="number"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.edad}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email:</label>
                            <input
                                className="form-control"
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.email}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Teléfono:</label>
                            <input
                                className="form-control"
                                name="telefono"
                                type="tel"
                                onChange={this.handleChange}
                                value={empleadoSeleccionado.telefono}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.actualizarEmpleado}>
                            Guardar Cambios
                        </Button>
                        <Button color="secondary" onClick={this.cerrarModalEditar}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default EmpleadosManager;