import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import ProductsForm from '../components/ProductsForm'
import Table from '../components/Table'
import Spinner from '../components/Spinner'
import Modal from '../components/Modal'
import Notification from '../components/Notification'
import * as productsDuck from '../ducks/Products'
import * as messagesDuck from '../ducks/Messages'
import * as modoEdicionDuck from '../ducks/ModoEdicion'

class Products extends React.Component{

    state= {
        open: false,
        openForm: false,
        openNotification: false,
        confirmation: false,
        action: false,
        loading: true,
    }

    async componentDidMount(){
        const { fetchProducts } = this.props
        await fetchProducts()
        this.setState({ ...this.state, loading: false })
    }

    handleClose = () => {
        this.setState({ ...this.state, open: false, openNotification:false, confirmation: false, action: false})
    }

    handleCloseForm = () => {
        const { selectProduct, assignModoEdicion } = this.props
        selectProduct(null)
        assignModoEdicion(false)
        this.setState({ ...this.state, openForm: false, confirmation: false, action: false})
    }

    handleEditarModal = (id, action) => async e => {
        const { assignMessage, assignModoEdicion, products, selectProduct } = this.props
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
                selectProduct(id)
                assignModoEdicion(true)
                this.setState({ ...this.state, openForm: true, confirmation: false, action: false})
                break;
            default:
                break;
        }
    }

    handleActive = id => async e => {
        const { editProducts, products, assignMessage } = this.props
        let product = products.data.filter( x => x.id === id)[0]
        await editProducts(id, {...product, active: !product.active})
        assignMessage("Registro editado")
        this.setState({ ...this.state, openNotification: true, open:false, confirmation: false, action: false})            
    }

    handleDelete = id => async e => {
        const { delProducts, products, assignMessage } = this.props
        let product = products.data.filter( x => x.id === id)[0]
        await delProducts(id)
        assignMessage("Registro Borrado")
        this.setState({ ...this.state, openNotification: true, open:false, confirmation: false, action: false})
    }

    handleEditar = async values => {
        const { products, editProducts, assignModoEdicion, assignMessage, selectProduct } = this.props
        let selectedProduct = products.data.filter(x => x.selected )
        let others = products.data.filter( x => !x.selected )
        if(others.some(x => ( x.name === values.name ))){
          assignMessage("Este producto ya existe!")
          this.setState({ ...this.state, openNotification: true, confirmation: false, action: false})            
        }else{
          await editProducts(selectedCategory[0].id, {...selectedCategory, ...values})
          selectProduct(null)
          assignModoEdicion(false)
          assignMessage("Registro editado")
          this.setState({ ...this.state, openForm: false, openNotification: true, confirmation: false, action: false})            
        }
    }

    handleAgregarRegistroModal = e => {
        this.setState({ ...this.state, openForm: true, confirmation: false, action: false})
    }

    handleAgregarRegistro = async values => {
        const { addProducts, assignMessage, products } = this.props   
        if(products.data.some(x => ( x.name === values.name ))){
            assignMessage("Este producto ya existe")
            this.setState({ ...this.state, openNotification: true, confirmation: false, action: false})            
        }else{
            await addProducts(values)
            assignMessage("Registro agregado")
            this.setState({ ...this.state, openForm: false, openNotification: true, confirmation: false, action: false})            
        }
    }


    render(){
        const { products, message, modoEdicion } = this.props
        return(
                <MDBContainer className="my-4">
                    <MDBRow>
                        <MDBCol>
                            <h2>Productos</h2>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                        {this.state.loading ? <Spinner/> :
                            <Table 
                                handleAgregar = {this.handleAgregarRegistroModal}
                                columns={[
                                    { title: 'Nombre', field: 'name' },
                                    { title: 'Código', field: 'code' },
                                    { title: 'Precio', field: 'price' },
                                    { title: 'Categoria', field: 'category' },
                                    { title: 'Descripción', field: 'comment'},
                                    { title: 'Comentario', field: 'comment' },
                                    { title: 'Activo', field: 'active' },
                                    { title: 'Fecha de Registro', field: 'created_at' },
                                    { title: 'Acción', field: 'action' },
                                ]}
                                data={products.data.map(x => ({
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
                        loading={products.fetching}
                        confirmation={this.state.confirmation}
                    >
                        {message.data}
                    </Modal>

                    <Modal
                        open={this.state.openForm}
                        handleClose={products.fetching ? false : this.handleCloseForm}
                        action={this.state.action}
                        loading={products.fetching}
                        confirmation={this.state.confirmation}
                    >
                        <ProductsForm products={products} onSubmit={modoEdicion ? this.handleEditar : this.handleAgregarRegistro} />
                    </Modal>

                    <Notification handleClose={this.handleClose} open={this.state.openNotification} message={message.data} />
                </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    return {
        products: state.Products,
        message: state.Messages,
        modoEdicion: state.ModoEdicion.data
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...productsDuck,
    ...messagesDuck,
    ...modoEdicionDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Products)