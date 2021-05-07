import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPplModal} from './AddPplModal';
import {EditPplModal} from './EditPplModal';

export class People extends Component{

    constructor(props){
        super(props);
        this.state = { ppls: [], addModalShow: false, editModalShow: false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'people')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ppls:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePpl(pplid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'people/'+pplid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const { ppls, pplid, pplname, ppladdress, pplage, pplinterests, pplphoto } = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PeopleId</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Age</th>
                            <th>Interests</th>
                            <th>Photo</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ppls.map(ppl=>
                            <tr key={ppl.PeopleId}>
                                <td>{ppl.PeopleId}</td>
                                <td>{ppl.Name}</td>
                                <td>{ppl.Address}</td>
                                <td>{ppl.Age}</td>
                                <td>{ppl.Interests}</td>
                                <td>{ppl.Photo}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        pplid: ppl.PeopleId, pplname: ppl.Name,
        ppladdress: ppl.Address,
        pplage: ppl.Age, pplinterests: ppl.Interests, pplphoto: ppl.Photo})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePpl(ppl.PeopleId)}>
            Delete
        </Button>

        <EditPplModal show={this.state.editModalShow}

             onHide={editModalClose}
             pplid={pplid}
             pplname={pplname}
             ppladdress={ppladdress}
             pplage={pplage}
             pplinterests={pplinterests}
             pplphoto={pplphoto} />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add People</Button>

                    <AddPplModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}