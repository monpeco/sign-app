import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import CategoryForm from '../components/CategoryForm'
import Table from '../components/Table'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import Notification from '../components/Notification'
import * as categoriesDuck from '../ducks/Categories'
import * as messagesDuck from '../ducks/Messages'
import * as modoEdicionDuck from '../ducks/ModoEdicion'

class Categories extends React.Component{

    state= {
        open: false,
        openForm: false,
        openNotification: false,
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
        this.setState({ ...this.state, open: false, openNotification:false, confirmation: false, action: false})
    }

    handleCloseForm = () => {
        const { selectCategory, assignModoEdicion } = this.props
        selectCategory(null)
        assignModoEdicion(false)
        this.setState({ ...this.state, openForm: false, confirmation: false, action: false})
    }

    handleEditarModal = (id, action) => async e => {
        const { assignMessage, assignModoEdicion, categories, selectCategory } = this.props
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
            case "delete":
                assignMessage(`¿Está seguro desea borrar el registro?`)
                this.setState({ ...this.state, open: true, confirmation: true, action: this.handleDelete(id)})
                break;
            case "edit":
                console.log(categories)
                selectCategory(id)
                assignModoEdicion(true)
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
        this.setState({ ...this.state, openNotification: true, open:false, confirmation: false, action: false})            
    }

    handleDelete = id => async e => {
        const { delCategories, categories, assignMessage } = this.props
        let category = categories.data.filter( x => x.id === id)[0]
        await delCategories(id)
        assignMessage("Registro Borrado")
        this.setState({ ...this.state, openNotification: true, open:false, confirmation: false, action: false})
    }

    handleEditar = async values => {
        const { categories, editCategories, assignModoEdicion, assignMessage, selectCategory } = this.props
        let selectedCategory = categories.data.filter(x => x.selected )
        let others = categories.data.filter( x => !x.selected )
        if(others.some(x => ( x.name === values.name ))){
          assignMessage("Esta categoría ya existe!")
          this.setState({ ...this.state, openNotification: true, confirmation: false, action: false})            
        }else{
          await editCategories(selectedCategory[0].id, {...selectedCategory, ...values})
          selectCategory(null)
          assignModoEdicion(false)
          assignMessage("Registro editado")
          this.setState({ ...this.state, openForm: false, openNotification: true, confirmation: false, action: false})            
        }
    }

    handleAgregarRegistroModal = e => {
        this.setState({ ...this.state, openForm: true, confirmation: false, action: false})
    }

    handleAgregarRegistro = async values => {
        console.log("llegue aqui")
        console.log(values)
        const { addCategories, assignMessage, categories } = this.props
        if(categories.data.some(x => ( x.name === values.name ))){
            assignMessage("Esta categoría ya existe")
            this.setState({ ...this.state, openNotification: true, confirmation: false, action: false})            
        }else{
            await addCategories(values)
            assignMessage("Registro agregado")
            this.setState({ ...this.state, openForm: false, openNotification: true, confirmation: false, action: false})            
        }
    }


    render(){
        const { categories, message, modoEdicion } = this.props
        const { loading } = this.state
        console.log(this.state.openNotification)
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
                                handleAgregar = {this.handleAgregarRegistroModal}
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
                                                <MDBBtn size="sm" color="unique" onClick={this.handleEditarModal(x.id,"delete")} >Eliminar</MDBBtn>
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

                    <Modal
                        open={this.state.openForm}
                        handleClose={loading ? false : this.handleCloseForm}
                        action={this.state.action}
                        loading={categories.fetching}
                        confirmation={this.state.confirmation}
                    >
                        <CategoryForm categories={categories} onSubmit={modoEdicion ? this.handleEditar : this.handleAgregarRegistro} />
                    </Modal>

                    <Notification handleClose={this.handleClose} open={this.state.openNotification} message={message.data} />
                </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    return {
        categories: state.Categories,
        message: state.Messages,
        modoEdicion: state.ModoEdicion.data
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...categoriesDuck,
    ...messagesDuck,
    ...modoEdicionDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)