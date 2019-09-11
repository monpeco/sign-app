import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import Table from '../components/Table'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import * as categoriesDuck from '../ducks/Categories'
import * as messagesDuck from '../ducks/Messages'

class Categories extends React.Component{

    state= {
        open: false,
        openForm: false,
        confirmation: false,
        action: false,
        loading: true,
    }

    async componentDidMount(){
        const { fetchCategories } = this.props
        await fetchCategories()
        this.setState({ ...this.state, loading:false})
    }

    handleClose = () => {
        this.setState({ ...this.state, open: false, confirmation: false, action: false})
    }

    /*handleCloseForm = () => {
        const { selectProveedor } = this.props
        selectProveedor(null)
        this.setState({ ...this.state, openForm: false, confirmation: false, action: false})
    }*/

    handleEditarModal = (id, action) => async e => {
        const { assignMessage, selectCategory } = this.props
        console.log("MODAL", action)
        switch (action) {
            case "activate":
                assignMessage(`¿Está seguro desea activar el registro?`)
                this.setState({ ...this.state, open: true, confirmation: true, action: this.handleActive(id)})
                break;
            case "deactivate":
                assignMessage(`¿Está seguro desea desactivar el registro?`)
                this.setState({ ...this.state, open: true, confirmation: true, action: this.handleActive(id)})
                break;
            case "edit":
                selectCategory(id)
                this.setState({ ...this.state, openForm: true, confirmation: false, action: false})
                break;
            default:
                break;
        }
    }

    handleActive = id => async e => {
        const { editCategories, categories, assignMessage } = this.props
        let category = categories.data.filter( x => x.id === id)[0]
        await editCategories(id, {...category, active: !category.active})
        assignMessage("Registro editado")
        this.setState({ ...this.state, open: true, confirmation: false, action: false})            
    }

    /*handleEditar = async values => {
        const { proveedores, editarProveedores, assignMessage, selectProveedor } = this.props
        let proveedorEditado = proveedores.data.filter(x => x.selected )
        let proveedoresRestantes = proveedores.data.filter( x => !x.selected )
        if(proveedoresRestantes.some(x => ( x.ciudad_id === values.ciudad_id && x.comuna_id === values.comuna_id && x.rut === values.rut ))){
          assignMessage("Este proveedor se encuentra en la lista")
          this.setState({ ...this.state, open: true, confirmation: false, action: false})            
        }else{
          await editarProveedores(proveedorEditado[0].id, {...proveedorEditado, ...values})
          selectProveedor(null)
          assignMessage("Registro editado")
          this.setState({ ...this.state, openForm: false, open: true, confirmation: false, action: false})            
        }
    }

    handleAgregarRegistroModal = e => {
        this.setState({ ...this.state, openForm: true, confirmation: false, action: false})
    }

    handleAgregarRegistro = async values => {
        const { agregarProveedores, assignMessage, proveedores } = this.props
        this.checkRut(values.rut)
        if(proveedores.data.some(x => ( x.ciudad_id === values.ciudad_id && x.comuna_id === values.comuna_id && x.rut === values.rut ))){
            assignMessage("Este proveedor ya existe")
            this.setState({ ...this.state, open: true, confirmation: false, action: false})            
        }else{
            //await agregarProveedores(values)
            assignMessage("Registro agregado")
            this.setState({ ...this.state, openForm: false, open: true, confirmation: false, action: false})            
        }
    }*/


    render(){
        const { categories, message } = this.props
        const { loading } = this.state
        console.log(categories)
        return(
                <MDBContainer className="my-4">
                    <MDBRow>
                        <MDBCol>
                            <h2>Categorías</h2>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                        {loading ? <Spinner/> :
                            <Table 
                                columns={[
                                    { title: 'Nombre', field: 'name' },
                                    { title: 'Descripción', field: 'comment'},
                                    { title: 'Activo', field: 'active' },
                                    { title: 'Fecha de Registro', field: 'created_at' },
                                    { title: 'Acción', field: 'action' },
                                ]}
                                data={categories.data.map(x => ({
                                    ...x,
                                    active: x.active ? "SI" : "NO",
                                    action: <div>
                                                <MDBBtn size="sm" color="unique" onClick={this.handleEditarModal(x.id, "edit")}><MDBIcon icon="pen" /></MDBBtn>
                                                <MDBBtn size="sm" color="unique" onClick={this.handleEditarModal(x.id,x.active ? "deactivate" : "activate")} >{x.active ? "desactivar" : "activar"}</MDBBtn>
                                            </div>
                                }))} 
                            />
                        }
                        </MDBCol>
                    </MDBRow>

                    <Modal
                        open={this.state.open}
                        handleClose={this.handleClose}
                        action={this.state.action}
                        loading={categories.fetching}
                        confirmation={this.state.confirmation}
                    >
                        {message.data}
                    </Modal>
                </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        categories: state.Categories,
        message: state.Messages,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...categoriesDuck,
    ...messagesDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)