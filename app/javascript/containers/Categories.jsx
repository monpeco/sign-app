import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import Table from '../components/Table'
import Spinner from '../components/Spinner'
import * as categoriesDuck from '../ducks/Categories'

class Categories extends React.Component{

    async componentDidMount(){
        const { fetchCategories } = this.props
        await fetchCategories()
    }

    render(){
        const { categories } = this.props
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
                        {categories.fetching ? <Spinner/> :
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
                                    action: <div>
                                                <MDBBtn size="sm" color="unique" ><MDBIcon icon="pen" /></MDBBtn>
                                                <MDBBtn size="sm" color="unique" ><MDBIcon icon="trash-alt" /></MDBBtn>
                                            </div>
                                }))} 
                            />
                        }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        categories: state.Categories
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...categoriesDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)