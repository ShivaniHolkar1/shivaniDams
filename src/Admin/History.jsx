import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Tooltip } from 'primereact/tooltip';
import Background from "../Assets/Background.png";
import refresh from "../Assets/refresh.png";
import "../App.css";
import "jspdf-autotable";
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';


export default function AuditHistory() {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dt = useRef(null);
  const [rows1, setRows1] = useState(10);
  const [first1, setFirst1] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');

  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/excel/${sessionStorage.getItem('emailId')} `;
  const CSV_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/csv/${sessionStorage.getItem('emailId')} `;
  const PDF_FILE_URL = `${process.env.REACT_APP_API_KEY}/AuditHistory/download/pdf/${sessionStorage.getItem('emailId')} `;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    activity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    userName_description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },



  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/AuditHistory/list`)
      .then((res) => {
console.log(res.data,"?//////////////")
        setPosts(res.data);
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





  // DOCUMENT DOWNLOAD
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  

  

    const [selectedFormat, setSelectedFormat] = useState(null);
  
 
 
  
    const handleSelectChange = (e) => {
      setSelectedFormat(e.value);
      console.log("e.value",e.value);
  
      if (e.value === 'pdf') {
        downloadFileAtURL(PDF_FILE_URL);
       
        // generatePDF();
      } else if (e.value === 'excel') {
        // generateExcel();
        downloadFileAtURL(DOC_FILE_URL);
      } else if (e.value === 'csv') {
        // generateCSV();
        downloadFileAtURL(CSV_FILE_URL);
      }
      e.value=null;
    };
  
    const exportOptions = [
      { label: 'PDF', value: 'pdf' },
      { label: 'Excel', value: 'excel' },
      { label: 'CSV', value: 'csv' },
    ];
  
    



  const renderHeader = () => {



    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="p-inputtext-sm"
          />
        </span>
        <Dropdown
          value={selectedFormat}
          options={exportOptions}
          onChange={handleSelectChange}
          placeholder="Export Data"
        />
  



{/* 
       <div>


          <Button
            style={{
              backgroundColor: "green",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file-excel"
            onClick={() => {
              downloadFileAtURL(DOC_FILE_URL);
            }}
            tooltip="XLS "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-success mr-2"

          />{" "}



          <Button
            style={{
              backgroundColor: "blue",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file"
            onClick={() => {
              downloadFileAtURL(CSV_FILE_URL);
            }}
            tooltip="CSV  "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="mr-2"

          />{" "}



          <Button
            style={{
              backgroundColor: "orange",
              height: "28px",
              width: "28px",
              color: "black",
            }}
            icon="pi pi-file-pdf"
            onClick={() => {
              downloadFileAtURL(PDF_FILE_URL);
            }}
            tooltip="PDF "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-warning mr-2"

          />{" "}
        </div>  */}
      </div>
    );
  };

  const dateBodyTemplate = (createOn) => {


    return (
      <div>
        {new Intl.DateTimeFormat("en-IN", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(createOn.createOn)}
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div>
          <Tooltip position="top" style={{ width: "30%" }} target={`.custom-tooltip-btn-${rowData.id}`}>
            {rowData.userName_description}
          </Tooltip>
          <div className={`custom-tooltip-btn-${rowData.id}`}>
            {rowData.userName_description}
          </div>
        </div>
      </React.Fragment>
    );
  };



  const header = renderHeader();

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





  return (
    <div className="datatable-doc-demo">


<img
      style={{ height: "80px",float: "right" }}
          src={Background}
          alt=" Background "
        />
       
      <br/>
      <br/>
      <br/>
      <br/>
       <b className="headerName">Audit History</b>
       

{/* 



      <Button
        style={{  color: "black", height: "35px" }}
        className="p-button-text p-button-plain"
      >
        <img
          style={{ width: "17px", marginRight: "10px", height: "15px" }}
          src={refresh}
          alt="refresh "
        />
        <b>Audit Histo</b>
      </Button>
      <img
        style={{ height: "53px", float: "right" }}
        src={Background}
        alt=" Background "
      />
      <br />
      <br /> */}
      <div>
        <DataTable
          ref={dt}
          value={posts}
          
          className="p-datatable-customers"
          header={header}
          stripedRows
        
          loading={loading}
          rows={rows1} 
        
          paginator paginatorTemplate={template1} first={first1} onPage={onCustomPage1}
          // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          showGridlines
          dataKey="id"
          rowHover
          size="small"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          // responsiveLayout="scroll"
          globalFilterFields={[
            "userName",
            "activity",
            "userName_description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="activity"
            header="Activity"
            sortable
            filter
            filterPlaceholder="Search by Activity"
            style={{ minWidth: "6rem" }}
          />


          <Column
            field="userName_description"
            header="User Name & Description"
            sortable
            filterField="userName_description"
            body={countryBodyTemplate}

            style={{
              maxWidth: "500px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              minWidth: "15rem"
            }}

            filter
            filterPlaceholder="Search by userName_description"
          />

          <Column
            bodyStyle={{ width: "11rem" }}
            field="createOn"
            header="Activity Date"
            sortable
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "10rem" }}

          />
        </DataTable>

      </div>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import { Dropdown } from 'primereact/dropdown';

// const ExportComponent = () => {
//   const [selectedFormat, setSelectedFormat] = useState(null);

//   useEffect(() => {
//     if (selectedFormat === 'pdf') {
//       // Generate PDF and trigger download
//       console.log('Generating PDF and triggering download');
//     } else if (selectedFormat === 'excel') {
//       // Generate Excel and trigger download
//       console.log('Generating Excel and triggering download');
//     } else if (selectedFormat === 'csv') {
//       // Generate CSV and trigger download
//       console.log('Generating CSV and triggering download');
//     }
//   }, [selectedFormat]);

//   const exportOptions = [
//     { label: 'PDF', value: 'pdf' },
//     { label: 'Excel', value: 'excel' },
//     { label: 'CSV', value: 'csv' },
//   ];

//   return (
//     <div>
//       <h2>Export Options</h2>
//       <Dropdown
//         value={selectedFormat}
//         options={exportOptions}
//         onChange={(e) => setSelectedFormat(e.value)}
//         placeholder="Select format"
//       />
//     </div>
//   );
// };

// export default ExportComponent;


// import React, { useState } from 'react';
// import { Dropdown } from 'primereact/dropdown';
// import { Worker, Viewer } from '@react-pdf-viewer/react-pdf';
// import { saveAs } from 'file-saver';

// const ExportComponent = () => {
//   const [selectedFormat, setSelectedFormat] = useState(null);

//   const generatePDF = () => {
//     const pdfContent = (
//       <div>
//         <h1>Generated PDF Content</h1>
//         <p>Some text here...</p>
//       </div>
//     );

//     const blob = new Blob([pdfContent], { type: 'application/pdf' });
//     saveAs(blob, 'generated.pdf');
//   };

//   const handleSelectChange = (e) => {
//     setSelectedFormat(e.value);

//     if (e.value === 'pdf') {
//       generatePDF();
//     }
//   };

//   const exportOptions = [
//     { label: 'PDF', value: 'pdf' },
//     { label: 'Excel', value: 'excel' },
//     { label: 'CSV', value: 'csv' },
//   ];

//   return (
//     <div>
//       <h2>Export Options</h2>
//       <Dropdown
//         value={selectedFormat}
//         options={exportOptions}
//         onChange={handleSelectChange}
//         placeholder="Select format"
//       />

//       {selectedFormat === 'pdf' && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Preview</h3>
//           <div style={{ border: '1px solid #ccc', width: '300px', height: '300px' }}>
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`}>
//               <Viewer fileUrl="path-to-your-pdf-file.pdf" />
//             </Worker>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExportComponent;
