import React from 'react';
import 'primeicons/primeicons.css'
import Api from '../api/userApi'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const listUsersTexts = {
    columnName: "Nome de usuario",
    columnEmail: "E-mail",
    columnRoles: "Roles/Claims",
    columnActions: "Ações",
    tableHeader: "Usuários cadastrados",
    searchColumnEmailPlaceholder: "Busque por e-mail",
    searchColumnNamePlaceholder: "Busque por nome de usuário",
    searchColumnRole: "Busque por roles/claims",
    pageTitle: "Users"
}

class ListUserJxs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalRecords: 0,
            loading: true,
            globalFilter: null
        };
        // this.toast = React.createRef();
        this.getUsers();
    }

    getUsers() {
        Api.get().then(r => {
            const users = JSON.parse(r.data);
            const totalRecords = users.length;
            this.setState({
                users: JSON.parse(r.data),
                totalRecords: totalRecords,
                loading: false
            });
        }).catch(e => {

        }).finally(() => {

        })
    }

    actionBodyTemplate(rowData) {
        const edit = (rowData) => {
            window.location.href = `${window.location.origin}/usuario/${rowData.Id}`;
        }
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="mr-1 p-button-rounded p-button-warning p-mr-2" onClick={() => edit(rowData)} />
                {/* <Button disabled icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmInactivate(rowData)} /> */}
            </React.Fragment>
        );
    }

    rolesBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <div>
                    {rowData.Roles.map((r, index) => {
                        return (<div key={index}>
                            Role: {r.Role}. Claims in Role: {JSON.stringify(r.Claims)}
                        </div>)
                    })}
                </div>
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header" style={{ display: "flex", "justifyContent": "space-between" }}>
                {listUsersTexts.tableHeader}
                {/* <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
                </span> */}
            </div>
        );

        return (
            <Card title={listUsersTexts.pageTitle} style={{ marginBottom: '2em' }}>
                <div>
                    <div className="card">
                        <DataTable
                            value={this.state.users}
                            header={header}
                            lazy
                            paginator
                            first={this.state.users.first}
                            rows={10}
                            loading={this.state.loading}
                            totalRecords={this.state.totalRecords}
                            resizableColumns
                            columnResizeMode="expand"
                            globalFilter={this.state.globalFilter}
                            emptyMessage="No customers found."
                            className="p-datatable-responsive-demo p-datatable-sm p-datatable-striped">
                            <Column
                                field="Username"
                                header={listUsersTexts.columnName}
                                filter
                                filterPlaceholder={listUsersTexts.searchColumnNamePlaceholder}
                                filterMatchMode="contains"
                                style={{ width: '20%' }}
                                sortable>
                            </Column>
                            <Column
                                field="Email"
                                filter
                                filterPlaceholder={listUsersTexts.searchColumnEmailPlaceholder}
                                filterMatchMode="contains"
                                header={listUsersTexts.columnEmail}
                                style={{ width: '25%' }}
                                sortable>
                            </Column>
                            <Column
                                header={listUsersTexts.columnRoles}
                                body={this.rolesBodyTemplate}>
                            </Column>
                            <Column
                                header={listUsersTexts.columnActions}
                                style={{ width: '15%' }}
                                body={this.actionBodyTemplate}>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </Card>
        );
    }
}

const ListUsers = () => {
    return <ListUserJxs />
};

export default ListUsers;