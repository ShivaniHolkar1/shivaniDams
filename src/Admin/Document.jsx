




import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { CustomerService } from "../service/CustomerService";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';

const Product = () => {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [rows1, setRows1] = useState(10);
  const [first1, setFirst1] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');



  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    documentname: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    reviewer: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const customerService = new CustomerService();



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/sample/getAllDoc`)
      .then((res) => {
        setPosts(res.data.reverse());
        setLoading(false);


      });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const onPageInputKeyDown = (event, options) => {
    if (event.key === 'Enter') {
        const page = parseInt(currentPage);
        if (page < 1 || page > options.totalPages) {
            setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
        }
        else {
            const first = currentPage ? options.rows * (page - 1) : 0;

            setFirst1(first);
            setPageInputTooltip('Press \'Enter\' key to go to this page.');
        }
    }
}

const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
}

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search"
              className="p-inputtext-sm"
            />
          </span>
        </div>

        <NavLink to="/UploadDocument" className="link1">
          <Button
            label="Upload Document"
            className="p-button-danger p-button-sm"
            style={{ backgroundColor: "#D04A02", borderRadius: "2px" }}
          />
        </NavLink>
      </div>
    );
  };




  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <Tooltip style={{ width: "30%" }} target={`.custom-tooltip-btn-${rowData.id}`}>
            {rowData.description}
          </Tooltip>
          <div className={`custom-tooltip-btn-${rowData.id}`}>
            {rowData.description}
          </div>
        </div>
      </React.Fragment>
    );
  };




  const hyperlinkTemplate = (rowData) => {
    
    return (
      <React.Fragment>
   
          
    <a style={{ textDecoration: 'underline',color:"#D04A01" }} onClick={() => editProduct(rowData)}>{rowData.documentname}</a>
      
      </React.Fragment>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.reviewer}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.Approved}`}>
        {rowData.Approved[0] ? "Approved" : "Review Pending"}
      </span>
    );
  };


  
  const dateBodyTemplate = (uploadedDate) => {
    
console.log("uploadedDate: ",uploadedDate.timestamp[0]);
    return (
    
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit" ,
          hour: "2-digit",
          minute: "2-digit",
        }).format(uploadedDate.timestamp[0])}
      </div>
    );
      }
  const header = renderHeader();

  const onCustomPage1 = (event) => {
    console.log(event,"event");
    setFirst1(event.first);
    setRows1(event.rows);
    
    setCurrentPage(event.page + 1);
   
}


  const template1 = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    'PrevPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span   className="pi pi-chevron-left"></span>
                <Ripple />
            </button>
        )
    },
  

    
    'NextPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
           <span  className="pi pi-chevron-right"></span>
                <Ripple />
            </button>
        )
    },

    'CurrentPageReport': (options) => {
      console.log(options,"options")
      return (
        <div>
        
          <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
              <InputText size="1" style={{textAlign: 'center'}}  className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                  onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
          </span>
            

          <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
            of {options.totalPages}
          </span>
          </div>
      )
  }
 
};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
       <Button
          icon="pi pi-folder-open"
          className="nextBtn p-button-sm"
          onClick={() => editProduct(rowData)}
          style={{
            backgroundColor: "#203570",
            width: "10%",
            height: "10%",
            borderRadius: "2px",
          }}
        />
      </React.Fragment>
    );
  };

  const editProduct = (product) => {
    customerService.docDataById = product;
    navigate("/Version/" + product.id);
  };
//   const PaginationSample = () => {
//     const [current, setCurrent] = React.useState(1);
//     const onPageChange = (page: number) => {
//       setCurrent(page);
//     }



//     return (
// <Pagination key={2} current={current} total={520} onPageChange={onPageChange}></Pagination>
//     )
//   }


  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={posts}
         showGridlines
          className="p-datatable-customers"
          header={header}
          rows={rows1} 
        
          paginator paginatorTemplate={template1} first={first1} onPage={onCustomPage1}
          dataKey="id"
          rowHover
          size="small"
          loading={loading}
          stripedRows
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={[
            "documentname",
            "description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          
          <Column
            field="documentname"
            header="Document Name"
            sortable
           
            style={{
              maxWidth: "200px",
              minWidth: "8rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            filter
            body={hyperlinkTemplate}
            filterPlaceholder="Search by Name"
            filterMenuStyle={{ width: "14rem" }}
          />

          <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{
              maxWidth: "400px",
              minWidth: "8rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by Description"
            filterMenuStyle={{ width: "14rem" }}
          />

          <Column
            field="reviewer"
            header="Reviewer"
            sortable
            filterField="reviewer"
            filterMatchMode="equals"
            style={{ minWidth: "8rem" }}
            filter
            filterPlaceholder="Search by Reviewer"
            body={countryTemplate}
          />


          {/* <Column
            field="timestamp"
            header="Sent On"
            sortable
            dataType="date"
            style={{ minWidth: "8rem" }}
          /> */}

<Column
            field="uploadedDate"
            header="Sent On"
            sortable
            dataType="date"
             body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}
           
          />

          <Column field="status" header="Status" body={statusBodyTemplate} />
{/* 
          <Column
            header="View"
            body={(e) => actionBodyTemplate(e)}
            exportable={false}
          ></Column> */}
        </DataTable>
      </div>
    </div>
  );
};

export default Product;







