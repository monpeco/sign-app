import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import Table from '../components/Table'
import Spinner from '../components/Spinner'
import * as usersDuck from '../ducks/Users'

class Users extends React.Component{

    async componentDidMount(){
        const { fetchUsers } = this.props
        await fetchUsers()
    }

    render(){
        const { users } = this.props
        console.log(users.data)
        return(
                <MDBContainer className="my-4">
                    <MDBRow>
                        <MDBCol>
                            <h2>Usuarios</h2>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                        {users.fetching ? <Spinner/> :
                            <Table 
                                columns={[
                                    { title: 'Nombres', field: 'Nombres' },
                                    { title: 'Email', field: 'email' },
                                    { title: 'Tipo de usuario', field: 'user_type'},
                                    { title: 'Fecha de Registro', field: 'created_at' },
                                    { title: 'Activo', field: 'active' },
                                    { title: 'Acción', field: 'action' },
                                ]}
                                data={users.data.map(x => ({
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
    return {
        users: state.Users
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...usersDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users)