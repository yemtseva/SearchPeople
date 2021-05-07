import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddPplModal } from './AddPplModal';
import { EditPplModal } from './EditPplModal';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { ppls: [], searchPplShow: false}
        this.searchPpl = this.searchPpl.bind(this);
    }

    searchPpl(e) {
        e.preventDefault();
        var searchTxt = this.searchTxt.value;
        fetch(process.env.REACT_APP_API + 'people/searchPpl?searchInput=' + searchTxt)
            .then(response => response.json())
            .then(data => {
                this.setState({ ppls: data, searchPplShow: true });
                this.searchPplShow = true;
            },
                (error) => {
                    this.setState({ searchPplShow:false })
                    alert('Failed');
                })
            
        
    }

    render() {

        const { ppls, pplid, pplname, ppladdress, pplage, pplinterests, pplphoto } = this.state;

        let { searchPplShow } = this.state;

        const renderPplShow = () => {
            if (searchPplShow) {
                return (
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>PeopleId</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Age</th>
                                <th>Interests</th>
                                <th>Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ppls.map(ppl =>
                                <tr key={ppl.PeopleId}>
                                    <td>{ppl.PeopleId}</td>
                                    <td>{ppl.Name}</td>
                                    <td>{ppl.Address}</td>
                                    <td>{ppl.Age}</td>
                                    <td>{ppl.Interests}</td>
                                    <td>{ppl.Photo}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                    )
            }
        }

        return (
            
            <div >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <h3 className="m-3 d-flex justify-content-center">
                    Search
                </h3>
                <div class="search-container">
                    <form >
                        <input ref={(c) => this.searchTxt = c} type="text" placeholder="Search.." id="selector" name="searchTxt" />
                        <button type="submit" onClick={this.searchPpl}><i class="fa fa-search"></i></button>
                        
                    </form>
                </div>

                {renderPplShow()}
             
            </div>
        )
    }
}