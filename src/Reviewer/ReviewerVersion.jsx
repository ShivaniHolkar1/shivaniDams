// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { NavLink, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import leftIcon from "../Assets/lefticon.png";
// import Background from "../Assets/Background.png";
// import { InputText } from "primereact/inputtext";
// import { Tag } from "primereact/tag";
// import plus from "../Assets/plus.png";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { ProgressSpinner } from "primereact/progressspinner";

// const Product = () => {
//   let [changeText, setChangeText] = useState(Boolean);
//   const [section, setSection] = useState([]);
//   let [changeEnable, setChangeEnable] = useState(Boolean);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [displayBasic6, setDisplayBasic6] = useState(false);
//   const [displayBasic3, setDisplayBasic3] = useState(false);
//   const [changeColor1, setChangeColor1] = useState(false);
//   const { id } = useParams();
//   const [values, setValues] = useState([]);
//   const [version, setversion] = useState([]);
//   const [versiondata, setVersionData] = useState([]);
//   const [file, setFile] = useState();
//   const toast = useRef(null);
//   const [errors, setErrors] = useState({});
//   const [keywords, setKeywords] = useState("");
//   const [users, setUser] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [secId, updatedSetsecId] = useState();
//   const [documentName, setDocumentName] = useState([]);
//   const [upladedBy, setLoginUser] = useState();
//   const [createdBy, setLoginUser1] = useState();
//   const [loading, setLoading] = useState(false);

//   //DOWNLOAD

//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}/${version}/${createdBy}`;

//   useEffect(() => {
//     setLoginUser(sessionStorage.getItem("emailId"));
//     setLoginUser1(sessionStorage.getItem("emailId"));
//     const version = "version1";
//     setversion(version);

//     getData(id);

//     // get all data by doc id
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         // setDocumentName(res.data.documentName);
//         setChangeEnable(res.data.enable);
//       });

//     // get bookmark by docId
//     const obj = {
//       createdBy: sessionStorage.getItem("emailId"),
//       version: version,
//     };
//     console.log("data1...: ", obj);
//     fetch(`${process.env.REACT_APP_API_KEY}/document/BookmarksListt/${id}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     }).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of bookmark by doc id");
//         setChangeText(resp.bookmarks);
//       });
//     });

//     // get all keywords by doc id

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${version}`
//       )
//       .then((res) => {
//         setUser(res.data[0].keywords);
//         setDocumentName(res.data[0].documentName);
//       });

//     // get all sections by doc id
//     // axios
//     //   .get(
//     //     `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`
//     //   )

//     //   .then((res) => {
//     //     console.log(res, "data of allsections");
//     //     setSection(res.data);
//     //   });

//     const data = {
//       userName: sessionStorage.getItem("emailId"),
//     };
//     console.log("data: ", data);
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of allsections");
//         setSection(resp);
//       });
//     });

//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of allsections");
//         setSection(resp);
//       });
//     });

//     // get all version by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
//       });
//   }, []);

//   function getDocDataByDocId(data) {
//     console.log(data, "////////////////////vijaya");
//     setVersionData(data);

//     const data1 = {
//       userName: sessionStorage.getItem("emailId"),
//     };

//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data1),
//       }
//     ).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of allsections");
//         setSection(resp);
//       });
//     });

//     // axios
//     //   .get(
//     //     `${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`
//     //   )
//     //   .then((res) => {
//     //     console.log(res.data, "data of ///sections");
//     //     setSection(res.data);

//     //   });
//   }

//   //DOCUMENT BOOKMARK

//   function bookmark(bookmark) {
//     let data = {
//       bookmarks: bookmark,
//       createdBy,
//     };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}/${version}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then(
//       (result) => {
//         console.log(result, "?????");
//         if (result.status === 200) {
//           result.json().then((response) => {
//             console.warn("resp", response);
//           });
//           console.log("bookmark: ", bookmark);
//           if (bookmark === "true") {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark added successfully.",
//             });
//           } else if (bookmark === "false") {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark removed successfully.",
//             });
//           }
//           setTimeout(() => {
//             window.location.reload(false);
//           }, 2000);
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Document Not Bookmarked ",
//             detail: "Error while Bookmarking Document",
//             life: 2000,
//           });
//         }
//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Document Not Bookmarked ",
//           detail: "Error while Bookmarking Document",
//           life: 2000,
//         });
//       }
//     );
//   }

//   //SECTION BOOKMARK
//   function BookmarkSection(rowData, bookmark) {
//     let data = {
//       bookmarks: bookmark,
//       createdBy,
//       docId: id,
//     };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${rowData.secId}/${version}`,
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then(
//       (result) => {
//         console.log(result, "?????");
//         if (result.status === 200) {
//           result.json().then((response) => {
//             console.warn("resp", response);
//           });
//           console.log("bookmark: ", bookmark);
//           if (bookmark === "true") {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark added successfully.",
//             });
//           } else if (bookmark === "false") {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark removed successfully.",
//             });
//           }
//           setTimeout(() => {
//             window.location.reload(false);
//           }, 2000);
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Section Not Bookmarked ",
//             detail: "Error while Bookmarking Section",
//             life: 2000,
//           });
//         }
//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Section Not Bookmarked ",
//           detail: "Error while Bookmarking Section",
//           life: 2000,
//         });
//       }
//     );
//   }

//   const getData = async (id) => {
//     console.log(id, "inside");
//   };

//   // DOCUMENT DOWNLOAD
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const docDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Download Successfully",
//       detail: "Document Download",
//       life: 3000,
//     });
//   };

//   //SECTION DOWNLOAD
//   const downloadSectionURL = (rowData) => {
//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}/${createdBy}`;

//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const secDownload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Download Successfully",
//       detail: "Section Download",
//       life: 3000,
//     });
//   };

//   const secUpload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Section Updated Successfully",
//       detail: "Section Updated",
//       life: 3000,
//     });
//   };

//   const enable = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Enabled Successfully",
//       detail: "Document Enable",
//       life: 3000,
//     });
//   };

//   const disable = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Disabled Successfully",
//       detail: "Document Disabled",
//       life: 3000,
//     });
//   };

//   const docUpload = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Document Uploaded Successfully",
//       detail: "Document Uploaded",
//       life: 3000,
//     });
//   };

//   const dialogFuncMap = {
//     displayBasic6: setDisplayBasic6,

//     displayBasic: setDisplayBasic,
//     displayBasic3: setDisplayBasic3,
//   };

//   const onClick = (name, position) => {
//     setKeyword(position);
//     dialogFuncMap[`${name}`](true);
//   };

//   // const onDialog = (name, position) => {

//   //   updatedSetsecId(position.secId);

//   //   dialogFuncMap[`${name}`](true);

//   // };

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   };

//   const reload = () => {
//     window.location.reload(false);
//   };

//   //DOCUMENT UPLOAD

//   // const documentUpload = (name) => {
//   //   return (
//   //     <div>
//   //       <Button
//   //         label="No"
//   //         style={{ borderRadius: "2px", color: "#203570" }}
//   //         onClick={() => onHide(name)}
//   //         onMouseDown={reload}
//   //         className="p-button-text p-button-sm"
//   //       />
//   //       <Button
//   //         label="Yes"
//   //         className="p-button-sm"
//   //         style={{ borderRadius: "2px", backgroundColor: "#203570" }}
//   //         onClick={() => onHide(name)}
//   //         onMouseDown={versionUpload}
//   //         disabled={isVersioncomplete}
//   //         onMouseUp={docUpload}
//   //         autoFocus
//   //       />
//   //     </div>
//   //   );
//   // };

//   //SECTION UPLOAD

//   const sectionupload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onMouseDown={reload}
//           style={{ borderRadius: "2px", color: "#203570" }}
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ borderRadius: "2px", backgroundColor: "#203570" }}
//           onClick={() => onHide(name)}
//           disabled={requiredfile}
//           onMouseDown={handleSubmit}
//           // onMouseUp={secUpload}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   function onSelectVersion(rowData) {
//     setversion(rowData);
//     getDocDataByDocId(rowData);

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${rowData}`
//       )
//       .then((res) => {
//         // console.log(res.data, "document data1234----");
//         if (res.data[0].keywords) {
//           setUser(res.data[0].keywords);
//         }

//         setChangeEnable(res.data[0].enable);
//         setChangeText(res.data[0].bookmarks);
//         setDocumentName(res.data[0].documentName);
//       });
//   }

//   //SECTION UPDATE

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!file) {
//       errors.file = "This Filed is required. ";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const requiredfile = !file;
//   function Documentupload(event) {
//     setFile(event.target.files[0]);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }

//     const url = `${process.env.REACT_APP_API_KEY}/document/updateSec`;

//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);
//     formData.append("secId", secId);

//     axios.put(url, formData).then((res) => {});

//     setTimeout(() => {
//       // window.location.reload(false);
//     }, 3000);
//   }

//   //UPLOAD UPDATED DOCUMENT

//   function UpdatedDocument(event) {
//     setFile(event.target.files[0]);
//   }

//   const isVersioncomplete = !file;
//   function versionUpload(event) {
//     event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }

//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);

//     axios.post(url, formData).then((res) => {});

//     setLoading(true);
//     setTimeout(() => {
//       axios
//         .get(
//           `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//         )
//         .then((res) => {
//           console.log(res.data, "version data");
//           setValues(res.data);
//           // setLoading(true);
//         });

//       window.location.reload(false);
//     }, 10000);

//     // setLoading(false);
//   }

//   // function versionUpload() {
//   //   // console.log("hello");
//   //   // const docId=id;
//   //   // event.preventDefault();
//   //   if (validateForm()) {
//   //     console.log("Valid form submitted:", { file });
//   //   }
//   //   const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
//   //   const formData = new FormData();
//   //   formData.append("file", file);
//   //   formData.append("docId", id);
//   //   axios.post(url, formData).then(
//   //     (res) => {}
//   //     // (res) => {
//   //     //   console.log(res);
//   //     // },
//   //     // (error) => {
//   //     //   alert(error);
//   //     // }
//   //   );
//   //   window.location.reload(false);

//   //   setTimeout(() => {
//   //     window.location.reload(false);
//   //   }, 1000);
//   // }

//   // function onClickHeader(rowData) {
//   //   setsecId(rowData.secId);
//   //   console.log("rowdata of accordation tab", rowData.secId);

//   // }

//   //PRINT SECTION
//   const handlePrint = (rowData) => {
//     // console.log(rowData.sectionContaion, "handlePrint//////////////");
//     const content = rowData.sectionContaion;
//     window.print(content);
//   };

//   //ENABLE DOCUMENT

//   // function EnableDocument() {
//   //   let data;

//   //   fetch(`${process.env.REACT_APP_API_KEY}/document/setEnable/${id}/${version} `, {
//   //     method: "PUT",
//   //     headers: {
//   //       Accept: "application/json",
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(data),
//   //   }).then((result) => {
//   //     result.json().then((resp) => {
//   //       console.warn("resp", resp);
//   //     });
//   //   });
//   //   setTimeout(() => {
//   //     window.location.reload(false);
//   //   }, 3000);
//   // }

//   const isFormIncomplete = !keywords;
//   //post keyword
//   // function saveUser() {
//   //   let data = { keywords,createdBy };
//   //   fetch(
//   //     `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`,

//   //     {
//   //       method: "POST",
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(data),
//   //     }
//   //   ).then((result) => {
//   //     result.json().then((resp) => {
//   //       // console.warn("resp", resp);
//   //     });
//   //   });
//   //   setTimeout(() => {
//   //     window.location.reload(false);
//   //   }, 2000);
//   // }

//   function saveUser() {
//     const version = "version1";

//     const data = { keywords, createdBy };
//     const apiUrl = `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`;

//     fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           toast.current.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "The keyword was added successfully.",
//           });
//         } else {
//           response.json().then((errorData) => {
//             console.log(errorData.developerMessage, "errordata");
//             toast.current.show({
//               severity: "error",
//               summary: "Failed",
//               detail:
//                 errorData.developerMessage ||
//                 "An error occurred during the adding keyword.",
//             });
//           });
//         }
//       })
//       .catch((error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Failed",
//           detail:
//             "Failed to fetch. An error occurred during the adding keyword.",
//         });
//       });

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1000);
//   }

//   // DELETE KEYWORD

//   // const DeleteKeyword = () => {
//   //   let data = { keyword };

//   //   fetch(
//   //     `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
//   //     {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(data),
//   //     }
//   //   )
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log(data); // Handle response data as needed
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   //     setTimeout(() => {
//   //       window.location.reload(false);
//   //     }, 1000);
//   // };

//   const DeleteKeyword = () => {
//     let data = { keyword, createdBy };
//     const version = "version1";

//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     )
//       .then((response) => {
//         if (response.status === 200) {
//           toast.current.show({
//             severity: "success",
//             summary: "Delete Successful",
//             detail: "The keyword was Deleted successfully.",
//           });
//         } else {
//           toast.current.show({
//             severity: "error",
//             summary: "Delete Failed",
//             detail: "An error occurred during the Delete Keyword.",
//           });
//         }
//       })
//       .catch((error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Delete Failed",
//           detail: "An error occurred during the Delete Keyword.",
//         });
//       });

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1000);
//   };

//   //keyword
//   const addkeyword = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Keyword Added Successfully",
//       detail: "Keyword Added",
//       life: 2000,
//     });
//   };

//   const renderFooter = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           style={{ borderRadius: "2px", color: "#203570" }}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Submit"
//           onClick={() => onHide(name)}
//           onMouseDown={saveUser}
//           // onMouseUp={addkeyword }
//           disabled={isFormIncomplete}
//           style={{ backgroundColor: "#203570", borderRadius: "2px" }}
//           className="p-button-sm"
//           autoFocus
//         />

//         {/* // onClick={() => onHide(name)} */}
//       </div>
//     );
//   };

//   const Deletekeyword = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "keyword Deleted Successfully",
//       detail: "keyword Deleted",
//       life: 1000,
//     });
//   };

//   //DELETE KEYWORD

//   const deletekeyword = (name) => {
//     // console.log
//     return (
//       <div>
//         <Button
//           label="No"
//           style={{ borderRadius: "2px" }}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-outlined"
//         />
//         &nbsp;&nbsp;
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ backgroundColor: "#203570", borderRadius: "2px" }}
//           onMouseDown={() => DeleteKeyword()}
//           // onMouseUp={Deletekeyword}
//           onClick={() => onHide(name)}
//           autoFocus
//         />
//       </div>
//     );
//   };
//   const actionBodyTemplate = (rowData) => {
//     return (
//       // <React.Fragment>

//       <>
//         {/* <Button
//             style={{
//               backgroundColor: "white",
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-upload"
//             tooltip="Update "
//             className="p-button-text"
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             onClick={() => onDialog("displayBasic6", rowData)}
//           />
          
//           &nbsp; */}
//         <Button
//           visible={!rowData.bookmarks}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           icon="pi pi-bookmark"
//           tooltip="Bookmark"
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           className="  p-button-text"
//           onClick={() => BookmarkSection(rowData, "true")}
//         />
//         <Button
//           visible={rowData.bookmarks}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           tooltip="Bookmark "
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           icon="pi pi-bookmark-fill"
//           className=" p-button-text"
//           onClick={() => {
//             BookmarkSection(rowData, "false");
//           }}
//         />{" "}
//         &nbsp;
//         <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           icon="pi pi-download"
//           onClick={() => {
//             downloadSectionURL(rowData);
//           }}
//           tooltip="Download "
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           className=" p-button-text"
//           onMouseDown={secDownload}
//         />{" "}
//         &nbsp;
//         {/* <Button
//             style={{
//               backgroundColor: "white",
              
//               height: "30px",
//               width: "30px",
//               color: "#203570",
//             }}
//             icon="pi pi-print"
//             tooltip="Print Section "
//             className=" p-button-text"
//             tooltipOptions={{
//               className: "teal-tooltip",
//               position: "bottom",
//             }}
//             id="print-content"
//             onClick={() => handlePrint(rowData)}
//           />
//           &nbsp; */}
//       </>
//       // </React.Fragment>
//     );
//   };

//   const sectionBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         {/* <Dropdown
//         style={{ backgroundColor: "white",  color: "#203570" }}
//         placeholder="Select "
//         className="custom-dropdown" 
        
//         value={ secVersion}
//         options={secVersion}
//         // onChange={(e) => onSelectVersion(e.value)}
//         optionLabel="version"
//         optionValue="version"
//       /> */}
//         <Dropdown optionLabel="name" placeholder="Select Section " />
//       </React.Fragment>
//     );
//   };

//   const paginatorRight = () => {
//     return (
//       <div>
//         <Button
//           style={{ color: "#203570", float: "right", borderRadius: "2px" }}
//           visible={!approveDoc}
//           label="Approve Document"
//           onClick={approveDocument}
//           onMouseDown={handleClick1}
//           className={`text-black p-button-sm  ${
//             changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
//           }`}
//         />
//         <br />
//       </div>
//     );
//   };

//   const paginatorLeft = <></>;

//   let [approveDoc, setApproveDoc] = useState(Boolean);
//   const navigate = useNavigate();
//   // APPROVE DOCUMENT

//   const handleClick1 = () => {
//     setChangeColor1(!changeColor1);
//   };

//   function approveDocument() {
//     let data = {
//       upladedBy,
//     };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/isapproved/${id}/${version} `,
//       {
//         method: "PUT",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then(
//       (result) => {
//         if (result.status === 200) {
//           console.warn("result...!!!", result);
//           result.json().then((resp) => {
//             console.warn("resp", resp);
//           });

//           toast.current.show({
//             severity: "success",
//             summary: "Document Approved",
//             detail: "Document Approved Successfully",
//             life: 2000,
//           });
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Document Not Approved",
//             detail: "Error while Approving Document",
//             life: 2000,
//           });
//         }
//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Document Not Approved",
//           detail: "Error while Approving Document",
//           life: 2000,
//         });
//       }
//     );
//     setTimeout(() => {
//       navigate("/reviewermain");
//     }, 3000);
//   }

//   return (
//     <div>
//       <Toast ref={toast} />
//       {loading ? (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       ) : null}
//       <NavLink to="/reviewermain" className="link1">
//         <Button
//           style={{ backgroundColor: "white", color: "black", height: "37px" }}
//           className="p-button-raised  p-button p-button-secondary p-button-text"
//         >
//           <img
//             style={{ width: "25px", marginRight: "10px", height: "25px" }}
//             src={leftIcon}
//             alt="leftIcon "
//           />
//           <b>{documentName}</b>
//         </Button>
//       </NavLink>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />
//       &nbsp;
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={() => bookmark("true")}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess}
//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={() => bookmark("false")}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//         // onMouseDown={showSuccess2}
//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised p-button-text"
//         onMouseDown={docDownload}
//       />{" "}
//       {/* &nbsp; */}
//       {/* <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className=" p-button-raised p-button-text"
//       /> */}
//       {/* &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-upload"
//         tooltip="Upload "
//         className=" p-button-raised p-button-text"
//         tooltipOptions={{
//           className: "teal-tooltip",
//           position: "bottom",
//         }}
//         onClick={() => onClick("displayBasic2")}
//       /> */}
//       {/* <Dialog
//         header="Upload particular version"
//         visible={displayBasic2}
//         style={{ width: "35vw" }}
//         footer={documentUpload("displayBasic2")}
//         onHide={() => onHide("displayBasic2")}
//       >
//         <form onSubmit={versionUpload}>
//           <input
//             style={{
//               marginTop: "15px",
//               marginLeft: "15px",
//             }}
//             type="file"
//             onChange={UpdatedDocument}
//           />
//           {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
//         </form>
//       </Dialog>
//       &nbsp; */}
//       {/* {loading ? (
//       <div>Loading...</div>
//     ) : ( */}
//       {/* height: "39px", */}
//       <Dropdown
//         style={{ backgroundColor: "white", color: "#203570" }}
//         placeholder="Select "
//         className="custom-dropdown"
//         value={versiondata}
//         options={values}
//         onChange={(e) => onSelectVersion(e.value)}
//         optionLabel="version"
//         optionValue="version"
//       />
//       {/* )} */}
//       <br />
//       <br />
//       <Card>
//         <Button
//           style={{
//             backgroundColor: "white",
//             float: "right",
//             color: "black",
//             height: "37px",
//           }}
//           className=" p-button p-button-secondary p-button-text"
//           onClick={() => onClick("displayBasic")}
//         >
//           <img
//             style={{ width: "15px", marginRight: "5px", height: "15px" }}
//             src={plus}
//             alt="plus "
//           />
//           <p style={{ color: "#203570" }}> Add Keywords</p>
//         </Button>
//         <Dialog
//           icon="pi pi-plus-circle"
//           header="Add Keyword"
//           visible={displayBasic}
//           style={{ width: "25vw" }}
//           footer={renderFooter("displayBasic")}
//           onHide={() => onHide("displayBasic")}
//         >
//           <InputText
//             type="text "
//             style={{ width: "100%", borderRadius: "2px" }}
//             placeholder="Enter Keyword "
//             onChange={(e) => {
//               setKeywords(e.target.value);
//             }}
//           />
//         </Dialog>
//         {users.map((keywords) => (
//           <Tag
//             style={{
//               backgroundColor: "#49ABA0",
//               marginRight: "3px",
//               color: "#203570",
//               borderRadius: "12px",
//               marginTop: "2px",
//             }}
//             icon="pi pi-times"
//             onClick={() => onClick("displayBasic3", keywords)}
//           >
//             {keywords}
//           </Tag>
//           // <Button >{item}</Button>
//         ))}
//         &nbsp;
//         <br />
//         <br />
//         <hr />
//         <Dialog
//           header="Delete Keyword ?"
//           visible={displayBasic3}
//           style={{ width: "30vw" }}
//           footer={deletekeyword("displayBasic3")}
//           onHide={() => onHide("displayBasic3")}
//         >
//           <p>Are you sure you want to delete this keyword ?</p>
//         </Dialog>
//         {/* //Add section */}
//         <Dialog
//           header="Update particular section"
//           visible={displayBasic6}
//           style={{ width: "35vw" }}
//           footer={sectionupload("displayBasic6")}
//           onHide={() => onHide("displayBasic6")}
//         >
//           <form onSubmit={handleSubmit}>
//             <input
//               style={{
//                 marginTop: "15px",
//                 marginLeft: "15px",
//               }}
//               type="file"
//               onChange={Documentupload}
//             />
//             {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
//           </form>
//         </Dialog>
//         {/* 
// <ScrollPanel style={{height: "350px" }}> */}
//         {/* <DataTable
//           // rows={9}
//           // scrollable
//           // scrollHeight="400px"
//           value={section}
//           // responsiveLayout="scroll"
//           > */}
//         <DataTable
//           value={section}
//           paginator
//           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//           rows={9}
//           paginatorLeft={paginatorLeft}
//           paginatorRight={paginatorRight}
//         >
//           <Column
//             field="sectionName"
//             style={{ minWidth: "10rem" }}
//             header="Identified Sections"
//           ></Column>
//           {/* <Column field="sectionversion" style={{ minWidth: "10rem" }} body={(e) => sectionBodyTemplate(e)} header="Section version"></Column> */}

//           <Column
//             header="Actions"
//             bodyStyle={{ width: "11rem" }}
//             bodyClassName="custom-body"
//             body={(e) => actionBodyTemplate(e)}
//           ></Column>
//         </DataTable>
//         <br />
//       </Card>
//     </div>
//   );
// };
// export default Product;

///Notes :replace rowData  with item to view Accordation

















// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";

// import axios from "axios";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import leftIcon from "../Assets/lefticon.png";
// import Background from "../Assets/Background.png";
// import { InputText } from "primereact/inputtext";
// import { Tag } from "primereact/tag";
// import plus from "../Assets/plus.png";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { NavLink, useParams, useNavigate } from "react-router-dom";


// const Product = () => {
//   let [changeText, setChangeText] = useState(Boolean);
//   const [section, setSection] = useState([]);
//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [displayBasic6, setDisplayBasic6] = useState(false);
//   const [displayBasic2, setDisplayBasic2] = useState(false);
//   const [displayBasic3, setDisplayBasic3] = useState(false);
//   const { id } = useParams();
//   const [values, setValues] = useState([]);
//   const [version, setversion] = useState([]);
//   const [versiondata, setVersionData] = useState([]);
//   const [file, setFile] = useState();
//   const toast = useRef(null);
//   const [errors, setErrors] = useState({});
//   const [keywords, setKeywords] = useState("");
//   const [users, setUser] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [secId, updatedSetsecId] = useState();
//   const [documentName, setDocumentName] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [upladedBy, setLoginUser] = useState()
//   const [createdBy, setLoginUser1] = useState()
//   const [bookmarkValue] = useState('true')
//   const [unBookmarkValue] = useState('false')


  

//   //DOWNLOAD


//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}/${version}/${createdBy}`;
//   useEffect(() => {
//     setLoginUser(sessionStorage.getItem('emailId'));
//     setLoginUser1(sessionStorage.getItem('emailId'));

//     const version = "version1";
//     setversion(version);
//     getData(id);

//     // get all data by doc id
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         console.log(res, "document data1234//////nnnn");
//         setDocumentName(res.data.documentName);
       
//       });

//     // get bookmark by docId
    

//     const obj={
//       createdBy:sessionStorage.getItem('emailId'),
//       version:version
//     }
//     console.log("data1...: ", obj);
//     fetch(`${process.env.REACT_APP_API_KEY}/document/BookmarksListt/${id}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     }).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of bookmark by doc id");
//         // setBookmarks(resp.bookmarks);
//         setChangeText(resp.bookmarks);

//       }
//       )
//     });


//     // get all keywords by doc id

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${version}`
//       )
//       .then((res) => {
//         console.log(res.data[0].documentName
//           , "document keyword");
//         setDocumentName(res.data[0].documentName)
//         setUser(res.data[0].keywords);
//       });

//     // get all sections by doc id

//     const data = {
//       userName:sessionStorage.getItem('emailId')
//     };
//     console.log("data: ", data);
//     fetch(`${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of allsections");
//         setSection(resp);
//       }
//       )
//     });




//     // get all version by doc id
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);

//       });


//   }, []);






//   function getDocDataByDocId(data) {
//     console.log(data, "////////////////////vijaya");
//     setVersionData(data)

    


//     const data1 = {
//       userName:sessionStorage.getItem('emailId')
//     };
  
//     fetch(`${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data1),
//     }).then((res) => {
//       res.json().then((resp) => {
//         console.log(resp, "data of allsections");
//         setSection(resp);
//       }
//       )
//     });



//   }


 


//   //DOCUMENT BOOKMARK
//   function bookmark(e,bookmark) {
// console.log(e,"././//.........",bookmark);
//     const data = {
//       bookmarks:bookmark,
//       createdBy
//     };
//     fetch(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}/${version}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//     .then((result) => {
//        console.log(result,"?????")
//         if (result.status === 200) {
//           result.json().then(( response) => {
//             console.warn("resp", response);
//           });
// console.log("bookmark: ",bookmark);
//           if (bookmark==='true') {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark added successfully.",
//             });
//           } else if(bookmark==='false') {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark removed successfully.",
//             });
//           }
//           setTimeout(() => {
//             window.location.reload(false);
//           }, 2000);
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Document Not Bookmarked ",
//             detail: "Error while Bookmarking Document",
//             life: 2000,
//           });
//         }

//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Document Not Bookmarked ",
//           detail: "Error while Bookmarking Document",
//           life: 2000,
//         });
//       }
//     );

      

//   }



//   function BookmarkSection(rowData,bookmark) {
//     console.log(rowData,"bookmarks ????????????")

//     const data = {
//       bookmarks:bookmark,
//       createdBy,
//       docId:id

//     };


//     fetch(`${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${rowData.secId}/${version}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//     .then(
//       (result) => {

       
//         console.log(result,"?????")
//         if (result.status === 200) {
//           result.json().then(( response) => {
//             console.warn("resp", response);
//           });
// console.log("bookmark: ",bookmark);
//           if (bookmark==='true') {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark added successfully.",
//             });
//           } else if(bookmark==='false') {
//             toast.current.show({
//               severity: "success",
//               summary: "Success",
//               detail: "Bookmark removed successfully.",
//             });
//           }
//           setTimeout(() => {
//             window.location.reload(false);
//           }, 2000);
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Section Not Bookmarked ",
//             detail: "Error while Bookmarking Section",
//             life: 2000,
//           });
//         }

//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Section Not Bookmarked ",
//           detail: "Error while Bookmarking Section",
//           life: 2000,
//         });
//       }
//     );

//   }




//   const getData = async (id) => {
//     console.log(id, "inside");
//   };

//   // DOCUMENT DOWNLOAD
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };



//   //SECTION DOWNLOAD
//   const downloadSectionURL = (rowData) => {

//     const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}/${createdBy}`;

//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;

//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

  






//   const docUpload = () => {

//     toast.current.show({
//       severity: "success",
//       summary: "Document Uploaded Successfully",
//       detail: "Document Uploaded",
//       life: 3000,
//     });
//   };

//   const dialogFuncMap = {
//     displayBasic2: setDisplayBasic2,
//     displayBasic6: setDisplayBasic6,

//     displayBasic: setDisplayBasic,
//     displayBasic3: setDisplayBasic3,
//   };

//   const onClick = (name, position) => {
//     setKeyword(position);
//    dialogFuncMap[`${name}`](true);
//   };

//   const onDialog = (name, position) => {
//    updatedSetsecId(position.secId);
//    dialogFuncMap[`${name}`](true);
// };




//   const onHide = (name) => {
//       dialogFuncMap[`${name}`](false);
//   };

//   const reload = () => {
//  window.location.reload(false);
//   };

//   //DOCUMENT UPLOAD


//   const documentUpload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           style={{ borderRadius: "2px", color: "#203570" }}
//           onClick={() => onHide(name)}


//           onMouseDown={reload}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ borderRadius: "2px", backgroundColor: "#203570" }}
//           onClick={() => onHide(name)}
//           onMouseDown={versionUpload}
//           disabled={isVersioncomplete}
//           onMouseUp={docUpload}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //SECTION UPLOAD

//   const sectionupload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onMouseDown={reload}
//           style={{ borderRadius: "2px", color: "#203570", }}
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ borderRadius: "2px", backgroundColor: "#203570", }}
//           onClick={() => onHide(name)}
//           disabled={requiredfile}
//           onMouseDown={handleSubmit}
        
//           autoFocus
//         />
//       </div>
//     );
//   };

//   function onSelectVersion(rowData) {
//     setversion(rowData);

//     getDocDataByDocId(rowData);



//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${rowData}`
//       )
//       .then((res) => {
//         if (res.data[0].keywords) {
//           setUser(res.data[0].keywords);
//         }
     
//         setDocumentName(res.data[0].documentName);


//       });
//   }


//   //SECTION UPDATE

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!file) {
//       errors.file = "This Filed is required. ";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const requiredfile = !file;
//   function Documentupload(event) {
//     setFile(event.target.files[0]);
//   }


//   function handleSubmit(event) {

//     event.preventDefault();
//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }



//     const url = `${process.env.REACT_APP_API_KEY}/document/updateSec`;

//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);
//     formData.append("secId", secId);
//     formData.append("upladedBy", upladedBy);

//     axios
//       .put(url, formData)
//       .then((response) => {
//         if (response.status === 200) {
//           // Show success message popup
//           toast.current.show({
//             severity: "success",
//             summary: "Updated Successful",
//             detail: "The file was updated successfully.",
//           });
//           setTimeout(() => {
//             window.location.reload(false);
//           }, 1000);
//         } else {
//           // Show error message popup
//           toast.current.show({
//             severity: "error",
//             summary: "Update Failed",
//             detail: "An error occurred during the file Update.",
//           });
//         }
//       })
//       .catch((error) => {
//         // Show error message popup
//         toast.current.show({
//           severity: "error",
//           summary: "Upload Failed",
//           detail: "An error occurred during the file Update.",
//         });
//       });


//   }







//   function UpdatedDocument(event) {
//     setFile(event.target.files[0]);

//   }

//   const isVersioncomplete = !file;
//   function versionUpload(event) {
//     event.preventDefault();

//     if (validateForm()) {
//       console.log("Valid form submitted:", { file });
//     }



//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);
//     axios.post(url, formData).then((res) => {
//     });
//     setLoading(true);

//     //  setTimeout(() => {
//     // setLoading(true);
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
//         window.location.reload(false);
//       });


//     //  }, 1000);

//     setLoading(false);

//   }







  



//   //ADD KEYWORD
//   const isFormIncomplete = !keywords;


//   function saveUser() {
//     const data = { keywords, createdBy };
//     const apiUrl = `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`;

//     fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.status === 200) {

//           toast.current.show({
//             severity: "success",
//             summary: "Successful",
//             detail: "The keyword was added successfully.",
//           });
//         } else {

//           response.json().then((errorData) => {
//             console.log(errorData.developerMessage, "errordata")
//             toast.current.show({
//               severity: "error",
//               summary: "Failed",
//               detail: errorData.developerMessage || "An error occurred during the adding keyword.",
//             });
//           });
//         }
//       })
//       .catch((error) => {

//         toast.current.show({
//           severity: "error",
//           summary: "Failed",
//           detail: "Failed to fetch. An error occurred during the adding keyword.",
//         });
//       });

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 1300);
//   }

//   // DELETE KEYWORD

//   const DeleteKeyword = () => {
//     let data = { keyword, createdBy };

//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//       })

//       .then((response) => {
//         if (response.status === 200) {

//           toast.current.show({
//             severity: "success",
//             summary: "Delete Successful",
//             detail: "The keyword was Deleted successfully.",
//           });
//         } else {

//           toast.current.show({
//             severity: "error",
//             summary: "Delete Failed",
//             detail: "An error occurred during the Delete Keyword.",
//           });
//         }
//       })
//       .catch((error) => {

//         toast.current.show({
//           severity: "error",
//           summary: "Delete Failed",
//           detail: "An error occurred during the Delete Keyword.",
//         });
//       });

//     setTimeout(() => {
//       window.location.reload(false);
//     }, 3000);

//   };

//   //keyword

//   const renderFooter = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           style={{ borderRadius: "2px", color: "#203570" }}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Submit"

//           onClick={() => onHide(name)}
//           onMouseDown={saveUser}
//           disabled={isFormIncomplete}
//           style={{ backgroundColor: "#203570", borderRadius: "2px" }}
//           className="p-button-sm"
//           autoFocus
//         />


//       </div>
//     );
//   };



//   //DELETE KEYWORD

//   const deletekeyword = (name) => {

//     return (
//       <div>
//         <Button
//           label="No"
//           style={{ borderRadius: "2px" }}
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-outlined"
//         />
//         &nbsp;&nbsp;
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           style={{ backgroundColor: "#203570", borderRadius: "2px" }}
//           onMouseDown={() => DeleteKeyword()}
//           onClick={() => onHide(name)}
//           autoFocus
//         />
//       </div>
//     );
//   };



//   const actionBodyTemplate = (rowData) => {
// console.log("rowData: ",rowData);
//     return (


//       <>
//         <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           icon="pi pi-upload"
//           tooltip="Update "
//           className="p-button-text"
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           onClick={() => onDialog("displayBasic6", rowData)}
//         />

//         &nbsp;
//         <Button
//           visible={!rowData.bookmarks}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           icon="pi pi-bookmark"
//           tooltip="Bookmark "
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           className="  p-button-text"
//           onClick={() => BookmarkSection(rowData,'true')}

//         />
//         <Button
//           visible={rowData.bookmarks}
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           tooltip="Bookmark "
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           icon="pi pi-bookmark-fill"
//           className=" p-button-text"

//           onClick={() => {
//             BookmarkSection(rowData,'false');
//           }}

//         />{" "}
//         &nbsp;
//         <Button
//           style={{
//             backgroundColor: "white",
//             height: "30px",
//             width: "30px",
//             color: "#203570",
//           }}
//           icon="pi pi-download"
//           onClick={() => {
//             downloadSectionURL(rowData);
//           }}
//           tooltip="Download "
//           tooltipOptions={{
//             className: "teal-tooltip",
//             position: "bottom",
//           }}
//           className=" p-button-text"
//         // onMouseDown={secDownload}
//         />{" "}
//         &nbsp;

//       </>

//     );
//   };



 



//   const [changeColor1, setChangeColor1] = useState(false);
 
//   const navigate = useNavigate();
//   // APPROVE DOCUMENT

//   const handleClick1 = () => {
//     setChangeColor1(!changeColor1);
//   };

//   function approveDocument() {
//     let data = {
//       upladedBy,
//     };
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/document/isapproved/${id}/${version} `,
//       {
//         method: "PUT",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     ).then(
//       (result) => {
//         if (result.status === 200) {
//           console.warn("result...!!!", result);
//           result.json().then((resp) => {
//             console.warn("resp", resp);
//           });

//           toast.current.show({
//             severity: "success",
//             summary: "Document Approved",
//             detail: "Document Approved Successfully",
//             life: 2000,
//           });
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Document Not Approved",
//             detail: "Error while Approving Document",
//             life: 2000,
//           });
//         }
//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Document Not Approved",
//           detail: "Error while Approving Document",
//           life: 2000,
//         });
//       }
//     );
//     setTimeout(() => {
//       navigate("/reviewermain");
//     }, 3000);
//   }


//   const paginatorRight = () => {

//     return (
//      <>
//        <div>
//         <Button
//           style={{ color: "#203570", float: "right", borderRadius: "2px" }}
//           // visible={!approveDoc}
//           label="Approve Document"
//           onClick={approveDocument}
//           onMouseDown={handleClick1}
//           className={`text-black p-button-sm  ${
//             changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
//           }`}
//         />
//         <br />
//       </div>
//      </>

//     )
//   }




//   return (
//     <div>
//       <Toast ref={toast} />
//       {loading ? (
//         <span className="loading">
//           <ProgressSpinner />
//         </span>
//       ) : null}

//       <NavLink to="/reviewermain" className="link1">
//         <Button
//           style={{ backgroundColor: "white", color: "black", height: "37px" }}
//           className="p-button-raised  p-button p-button-secondary p-button-text"
//         >
//           <img
//             style={{ width: "25px", marginRight: "10px", height: "25px" }}
//             src={leftIcon}
//             alt="leftIcon "
//           />
//           <b>{documentName}</b>

//         </Button>
//       </NavLink>
//       <img
//         style={{ height: "55px", float: "right" }}
//         src={Background}
//         alt=" Background "
//       />
//       &nbsp;
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={(e)=>bookmark(e,bookmarkValue)}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"

//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={(e)=>bookmark(e,unBookmarkValue)}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"

//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised p-button-text"
//       // onMouseDown={docDownload}
//       />{" "}
//       &nbsp;
//       {/* <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className=" p-button-raised p-button-text"
//       /> */}
//       {/* &nbsp; */}
//       {/* <Button
//         style={{
//           backgroundColor: "white",
//           height: "37px",
//           width: "37px",
//           color: "#203570",
//         }}
//         icon="pi pi-upload"
//         tooltip="Upload "
//         className=" p-button-raised p-button-text"
//         tooltipOptions={{
//           className: "teal-tooltip",
//           position: "bottom",
//         }}
//         onClick={() => onClick("displayBasic2")}
//       />
//       <Dialog
//         header="Upload particular version"
//         visible={displayBasic2}
//         style={{ width: "35vw" }}
//         footer={documentUpload("displayBasic2")}
//         onHide={() => onHide("displayBasic2")}
//       >
//         <form onSubmit={versionUpload}>
//           <input
//             style={{
//               marginTop: "15px",
//               marginLeft: "15px",
//             }}
//             type="file"
//             onChange={UpdatedDocument}
//           />
//           {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
//         </form>
//       </Dialog>
//       &nbsp; */}

//       <Dropdown
//         style={{ backgroundColor: "white", color: "#203570" }}
//         placeholder="Select "
//         className="custom-dropdown"

//         value={versiondata}
//         options={values}
//         onChange={(e) => onSelectVersion(e.value)}
//         optionLabel="version"
//         optionValue="version"
//       />
//       {/* )} */}


//       <br />
//       <br />
//       <Card style={{height:"80vh"}}>
//         <Button
//           style={{
//             backgroundColor: "white",
//             float: "right",
//             color: "black",
//             height: "37px",
//           }}
//           className=" p-button p-button-secondary p-button-text"
//           onClick={() => onClick("displayBasic")}
//         >
//           <img
//             style={{ width: "15px", marginRight: "5px", height: "15px" }}
//             src={plus}
//             alt="plus "
//           />
//           <p style={{ color: "#203570" }}> Add Keywords</p>
//         </Button>
//         <Dialog
//           icon="pi pi-plus-circle"
//           header="Add Keyword"
//           visible={displayBasic}
//           style={{ width: "25vw" }}
//           footer={renderFooter("displayBasic")}
//           onHide={() => onHide("displayBasic")}
//         >
//           <InputText
//             type="text "
//             style={{ width: "100%", borderRadius: "2px", height: "7vh"  }}
//             placeholder="Enter Keyword "
//             onChange={(e) => {
//               setKeywords(e.target.value);
//             }}
//           />
//         </Dialog>

//         {users.map((keywords) => (
//           <Tag
//             style={{
//               backgroundColor: "#49ABA0",
//               color: "#203570",
//               marginRight: "3px",
//               borderRadius: "12px",
//               marginTop: "3px"
//             }}

//             onClick={() => onClick("displayBasic3", keywords)}
//             icon="pi pi-times"

//           >
//             {keywords}
//           </Tag>

//         ))}
  
//         <Dialog
//           header="Delete Keyword ?"
//           visible={displayBasic3}
//           style={{ width: "30vw" }}
//           footer={deletekeyword("displayBasic3")}
//           onHide={() => onHide("displayBasic3")}
//         >
//           <p>Are you sure you want to delete this keyword ?</p>
//         </Dialog>



//         {/* //Add section */}
//         <Dialog
//           header="Update particular section"
//           visible={displayBasic6}
//           style={{ width: "35vw" }}

//           footer={sectionupload("displayBasic6")}
//           onHide={() => onHide("displayBasic6")}
//         >
//           <form onSubmit={handleSubmit}>
//             <input
//               style={{
//                 marginTop: "15px",
//                 marginLeft: "15px",
//               }}
//               type="file"
//               onChange={Documentupload}
//             />
//             {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
//           </form>
//         </Dialog>

  
//     <br/>
//     <br/>
//     <hr />
       
//         <DataTable
//           value={section}
//           paginator
//           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
//           currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
//           rows={8}
//           stripedRows


//           paginatorRight={paginatorRight}
//         >

//           <Column field="sectionName" style={{ minWidth: "10rem" }} header="Identified Sections"></Column>
//           {/* <Column field="sectionversion" style={{ minWidth: "10rem" }} body={(e) => sectionBodyTemplate(e)} header="Section version"></Column> */}

//           <Column header="Actions" bodyStyle={{ width: "11rem" }} bodyClassName="custom-body" body={(e) => actionBodyTemplate(e)} ></Column>




//         </DataTable>

//         <br />
//       </Card>
//     </div>
//   );
// };
// export default Product;


























import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { NavLink, useParams,useNavigate, } from "react-router-dom";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import leftIcon from "../Assets/lefticon.png";
import Background from "../Assets/Background.png";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import plus from "../Assets/plus.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from 'primereact/progressspinner';


const Product = () => {
  let [changeText, setChangeText] = useState(Boolean);
  let [bookmarks, setBookmarks] = useState(Boolean);
  const [section, setSection] = useState([]);
  let [changeEnable, setChangeEnable] = useState(Boolean);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic6, setDisplayBasic6] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor2, setChangeColor2] = useState(false);
  const { id } = useParams();
  const [values, setValues] = useState([]);
  const [version, setversion] = useState([]);
  const [versiondata, setVersionData] = useState([]);
  const [file, setFile] = useState();
  const toast = useRef(null);
  const [errors, setErrors] = useState({});
  const [keywords, setKeywords] = useState("");
  const [users, setUser] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [secId, updatedSetsecId] = useState();
  const [documentName, setDocumentName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upladedBy, setLoginUser] = useState()
  const [createdBy, setLoginUser1] = useState()

  
  
  const [bookmarkValue] = useState('true')
  const [unBookmarkValue] = useState('false')


  const handleClick = () => {
    setChangeColor(!changeColor);
  };

  const handleClick2 = () => {
    setChangeColor2(!changeColor2);
  };

  //DOWNLOAD


  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}/${version}/${createdBy}`;
  useEffect(() => {
    setLoginUser(sessionStorage.getItem('emailId'));
    setLoginUser1(sessionStorage.getItem('emailId'));

    const version = "version1";
    setversion(version);
    getData(id);

   
   



    getAllDocument();
    
      getAllkeyword();
      getAllDocumentBookmark();
      getAllSectionBookmark();
      getDocDataByDocId();
      getAllVersion();
  }, []);


  const getAllDocument=()=>{
     // get all data by doc id
     axios
     .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
     .then((res) => {
       console.log(res, "document data1234//////nnnn");
       setDocumentName(res.data.documentName);
       setChangeEnable(res.data.enable);
       console.log(changeText, "bookmarked....!!!!");
     });

  }



  const getAllVersion=()=>{

    

    // get all version by doc id
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
      )
      .then((res) => {
        console.log(res.data, "version data");
        setValues(res.data);

      });
  }

  const getAllSectionBookmark=()=>{
 // get all sections by doc id
    const version = "version1";
    const data = {
      userName:sessionStorage.getItem('emailId')
    };
    console.log("data: ", data);
    fetch(`${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${version}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((resp) => {
        console.log(resp, "data of allsections");
        setSection(resp);
      }
      )
    });
  }










  const getAllDocumentBookmark=()=>{


     // get bookmark by docId
    
     const version = "version1";
     const obj={
      createdBy:sessionStorage.getItem('emailId'),
      version:version
    }
    console.log("data1...: ", obj);
    fetch(`${process.env.REACT_APP_API_KEY}/document/BookmarksListt/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      res.json().then((resp) => {
        console.log(resp, "data of bookmark by doc id");
        setBookmarks(resp.bookmarks);
        setChangeText(resp.bookmarks);

      }
      )
    });
  }







  const getAllkeyword =()=>{
    
    // get all keywords by doc id
    const version = "version1";

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${version}`
      )
      .then((res) => {
        console.log(res.data[0].documentName
          , "document keyword");
        setDocumentName(res.data[0].documentName)
        setUser(res.data[0].keywords);
      });

  }



  function getDocDataByDocId(data) {
    console.log(data, "////////////////////vijaya");
    setVersionData(data)

    

    const data1 = {
      userName:sessionStorage.getItem('emailId')
    };
    // console.log("data: ", data);
    fetch(`${process.env.REACT_APP_API_KEY}/document/getallsectionsbydocid/${id}/${data}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    }).then((res) => {
      res.json().then((resp) => {
        console.log(resp, "data of allsections");
        setSection(resp);
      }
      )
    });



  }


  
  //DOCUMENT BOOKMARK
  function bookmark(e,bookmark) {
console.log(e,"././//.........",bookmark);
    const data = {
      bookmarks:bookmark,
      createdBy
    };
    fetch(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}/${version}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((result) => {
       console.log(result,"?????")
        if (result.status === 200) {
          result.json().then(( response) => {
            console.warn("resp", response);
          });
console.log("bookmark: ",bookmark);
          if (bookmark==='true') {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Bookmark added successfully.",
            });
            getAllDocumentBookmark();
          } else if(bookmark==='false') {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Bookmark removed successfully.",
            });
          }
          getAllDocumentBookmark();
         
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Document Not Bookmarked ",
            detail: "Error while Bookmarking Document",
            life: 2000,
          });
        }
        getAllDocumentBookmark();

      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "Document Not Bookmarked ",
          detail: "Error while Bookmarking Document",
          life: 2000,
        });
      }
    );

      

  }



  function BookmarkSection(rowData,bookmark) {
    console.log(rowData,"bookmarks ????????????")

    const data = {
      bookmarks:bookmark,
      createdBy,
      docId:id

    };


    fetch(`${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${rowData.secId}/${version}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(
      (result) => {

       
        console.log(result,"?????")
        if (result.status === 200) {
          result.json().then(( response) => {
            console.warn("resp", response);
          });
console.log("bookmark: ",bookmark);
          if (bookmark==='true') {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Bookmark added successfully.",
            });
            getAllSectionBookmark();
          } else if(bookmark==='false') {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Bookmark removed successfully.",
            });
          }
          getAllSectionBookmark();
        
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Section Not Bookmarked ",
            detail: "Error while Bookmarking Section",
            life: 2000,
          });
        }
        getAllSectionBookmark();
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "Section Not Bookmarked ",
          detail: "Error while Bookmarking Section",
          life: 2000,
        });
      }
    );

  }




  const getData = async (id) => {
    console.log(id, "inside");
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

  const docDownload = () => {
    toast.current.show({
      severity: "success",
      summary: "Document Download Successfully",
      detail: "Document Download",
      life: 3000,
    });
  };

  //SECTION DOWNLOAD
  const downloadSectionURL = (rowData) => {

    const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.secId}/${createdBy}`;

    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;

    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const secDownload = () => {
    toast.current.show({
      severity: "success",
      summary: "Section Download Successfully",
      detail: "Section Download",
      life: 3000,
    });
  };





  

  const docUpload = () => {

    toast.current.show({
      severity: "success",
      summary: "Document Uploaded Successfully",
      detail: "Document Uploaded",
      life: 3000,
    });
  };

  const dialogFuncMap = {
    displayBasic2: setDisplayBasic2,
    displayBasic6: setDisplayBasic6,

    displayBasic: setDisplayBasic,
    displayBasic3: setDisplayBasic3,
  };

  const onClick = (name, position) => {

    setKeyword(position);

    dialogFuncMap[`${name}`](true);
  };

  const onDialog = (name, position) => {

    updatedSetsecId(position.secId);

    dialogFuncMap[`${name}`](true);

  };




  const onHide = (name) => {

    dialogFuncMap[`${name}`](false);
  };


  //DOCUMENT UPLOAD


  const documentUpload = (name) => {
    return (
      <div>
        <Button
          label="No"
          style={{ borderRadius: "2px", color: "#203570" }}
          onClick={() => onHide(name)}


        
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ borderRadius: "2px", backgroundColor: "#203570" }}
          onClick={() => onHide(name)}
          onMouseDown={versionUpload}
          disabled={isVersioncomplete}
          onMouseUp={docUpload}
          autoFocus
        />
      </div>
    );
  };

  //SECTION UPLOAD

  const sectionupload = (name) => {
    return (
      <div>
        <Button
          label="No"
       
          style={{ borderRadius: "2px", color: "#203570", }}
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ borderRadius: "2px", backgroundColor: "#203570", }}
          onClick={() => onHide(name)}
          disabled={requiredfile}
          onMouseDown={handleSubmit}
          // onMouseUp={secUpload}
          autoFocus
        />
      </div>
    );
  };

  function onSelectVersion(rowData) {
    setversion(rowData);

    getDocDataByDocId(rowData);



    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/listKeywords/${id}/${rowData}`
      )
      .then((res) => {
        if (res.data[0].keywords) {
          setUser(res.data[0].keywords);
        }
        setChangeEnable(res.data[0].enable);
      
        setDocumentName(res.data[0].documentName);


      });
  }


  //SECTION UPDATE

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!file) {
      errors.file = "This Filed is required. ";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const requiredfile = !file;
  function Documentupload(event) {
    setFile(event.target.files[0]);
  }


  function handleSubmit(event) {

    event.preventDefault();
    if (validateForm()) {
      console.log("Valid form submitted:", { file });
    }



    const url = `${process.env.REACT_APP_API_KEY}/document/updateSec`;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("docId", id);
    formData.append("secId", secId);
    formData.append("upladedBy", upladedBy);

    axios
      .put(url, formData)
      .then((response) => {
        if (response.status === 200) {
          // Show success message popup
          toast.current.show({
            severity: "success",
            summary: "Updated Successful",
            detail: "The file was updated successfully.",
          });
       
          getAllSectionBookmark();
        } else {
          // Show error message popup
          toast.current.show({
            severity: "error",
            summary: "Update Failed",
            detail: "An error occurred during the file Update.",
          });
        }
        getAllSectionBookmark();
      })
      .catch((error) => {
        // Show error message popup
        toast.current.show({
          severity: "error",
          summary: "Upload Failed",
          detail: "An error occurred during the file Update.",
        });
      });
      getAllSectionBookmark();

  }







  function UpdatedDocument(event) {
    setFile(event.target.files[0]);

  }

  const isVersioncomplete = !file;
  function versionUpload(event) {
    event.preventDefault();

    if (validateForm()) {
      console.log("Valid form submitted:", { file });
    }



    const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("docId", id);
    axios.post(url, formData).then((res) => {
    });
    setLoading(true);

    //  setTimeout(() => {
    // setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
      )
      .then((res) => {
        console.log(res.data, "version data");
        setValues(res.data);
        getAllVersion();
      });


    //  }, 1000);

    setLoading(false);

  }







  //ADD KEYWORD
  const isFormIncomplete = !keywords;


  function saveUser() {
    const data = { keywords, createdBy };
    const apiUrl = `${process.env.REACT_APP_API_KEY}/document/saveKeywords/${id}/${version}`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {

        if (response.status === 200) {

          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "The keyword was added successfully.",
          });
          getAllkeyword();
        } else {

          response.json().then((errorData) => {
            console.log(errorData.developerMessage, "errordata")
            toast.current.show({
              severity: "error",
              summary: "Failed",
              detail: errorData.developerMessage || "An error occurred during the adding keyword.",
            });
          });
        }
        getAllkeyword();
      })
      .catch((error) => {

        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Failed to fetch. An error occurred during the adding keyword.",
        });
      });
      getAllkeyword();
  
  }

  // DELETE KEYWORD

  const DeleteKeyword = () => {
    let data = { keyword, createdBy };

    fetch(
      `${process.env.REACT_APP_API_KEY}/document/deleteKeywords/${id}/${version}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      .then((response) => {
        if (response.status === 200) {

        
          toast.current.show({
            severity: "success",
            summary: "Delete Successful",
            detail: "The keyword was Deleted successfully.",
          });
          getAllkeyword();
          
        } else {

          toast.current.show({
            severity: "error",
            summary: "Delete Failed",
            detail: "An error occurred during the Delete Keyword.",
          });
        }
        getAllkeyword();
      })
      .catch((error) => {

        toast.current.show({
          severity: "error",
          summary: "Delete Failed",
          detail: "An error occurred during the Delete Keyword.",
        });
      });
      getAllkeyword();

  
  };

  //keyword

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          style={{ borderRadius: "2px", color: "#203570" }}
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Submit"

          onClick={() => onHide(name)}
          onMouseDown={saveUser}
          disabled={isFormIncomplete}
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          className="p-button-sm"
          autoFocus
        />


      </div>
    );
  };



  //DELETE KEYWORD

  const deletekeyword = (name) => {

    return (
      <div>
        <Button
          label="No"
          style={{ borderRadius: "2px" }}
          onClick={() => onHide(name)}
          className="p-button-sm p-button-outlined"
        />
        &nbsp;&nbsp;
        <Button
          label="Yes"
          className="p-button-sm"
          style={{ backgroundColor: "#203570", borderRadius: "2px" }}
          onMouseDown={() => DeleteKeyword()}
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };



  const actionBodyTemplate = (rowData) => {
console.log("rowData: ",rowData);
    return (


      <>
        <Button
          style={{
            backgroundColor: "white",
            height: "30px",
            width: "30px",
            color: "#203570",
          }}
          icon="pi pi-upload"
          tooltip="Update "
          className="p-button-text"
          tooltipOptions={{
            className: "teal-tooltip",
            position: "bottom",
          }}
          onClick={() => onDialog("displayBasic6", rowData)}
        />

        &nbsp;
        <Button
          visible={!rowData.bookmarks}
          style={{
            backgroundColor: "white",
            height: "30px",
            width: "30px",
            color: "#203570",
          }}
          icon="pi pi-bookmark"
          tooltip="Bookmark "
          tooltipOptions={{
            className: "teal-tooltip",
            position: "bottom",
          }}
          className="  p-button-text"
          onClick={() => BookmarkSection(rowData,'true')}

        />
        <Button
          visible={rowData.bookmarks}
          style={{
            backgroundColor: "white",
            height: "30px",
            width: "30px",
            color: "#203570",
          }}
          tooltip="Bookmark "
          tooltipOptions={{
            className: "teal-tooltip",
            position: "bottom",
          }}
          icon="pi pi-bookmark-fill"
          className=" p-button-text"

          onClick={() => {
            BookmarkSection(rowData,'false');
          }}

        />{" "}
        &nbsp;
        <Button
          style={{
            backgroundColor: "white",
            height: "30px",
            width: "30px",
            color: "#203570",
          }}
          icon="pi pi-download"
          onClick={() => {
            downloadSectionURL(rowData);
          }}
          tooltip="Download "
          tooltipOptions={{
            className: "teal-tooltip",
            position: "bottom",
          }}
          className=" p-button-text"
        onMouseDown={secDownload}
        />{" "}
        &nbsp;

        {/* <Button
            style={{
              backgroundColor: "white",
              
              height: "30px",
              width: "30px",
              color: "#203570",
            }}
            icon="pi pi-print"
            tooltip="Print Section "
            className=" p-button-text"
            tooltipOptions={{
              className: "teal-tooltip",
              position: "bottom",
            }}
            id="print-content"
            onClick={() => handlePrint(rowData)}
          />
          &nbsp; */}
      </>

    );
  };




  const [changeColor1, setChangeColor1] = useState(false);
 
  const navigate = useNavigate();
  // APPROVE DOCUMENT

  const handleClick1 = () => {
    setChangeColor1(!changeColor1);
  };

  function approveDocument() {
    let data = {
      upladedBy,
    };
    fetch(
      `${process.env.REACT_APP_API_KEY}/document/isapproved/${id}/${version} `,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(
      (result) => {
        if (result.status === 200) {
          console.warn("result...!!!", result);
          result.json().then((resp) => {
            console.warn("resp", resp);
          });

          toast.current.show({
            severity: "success",
            summary: "Document Approved",
            detail: "Document Approved Successfully",
            life: 2000,
          });
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Document Not Approved",
            detail: "Error while Approving Document",
            life: 2000,
          });
        }
      },
      (error) => {
        toast.current.show({
          severity: "error",
          summary: "Document Not Approved",
          detail: "Error while Approving Document",
          life: 2000,
        });
      }
    );
    setTimeout(() => {
      navigate("/reviewermain");
    }, 3000);
  }


  const paginatorRight = () => {

    return (
     <>
       <div>
        <Button
          style={{ color: "#203570", float: "right", borderRadius: "2px" }}
          // visible={!approveDoc}
          label="Approve Document"
          onClick={approveDocument}
          onMouseDown={handleClick1}
          className={`text-black p-button-sm  ${
            changeColor1 === true ? "bg-blue-800 text-white" : "bg-white"
          }`}
        />
        <br />
      </div>
     </>

    )
  }



  return (
    <div>
      <Toast ref={toast} />
      {loading ? (
        <span className="loading">
          <ProgressSpinner />
        </span>
      ) : null}

      <NavLink to="/reviewermain"className="link1">
        <Button
          style={{ backgroundColor: "white", color: "black", height: "37px" }}
          className="p-button-raised  p-button p-button-secondary p-button-text"
        >
          <img
            style={{ width: "25px", marginRight: "10px", height: "25px" }}
            src={leftIcon}
            alt="leftIcon "
          />
          <b>{documentName}</b>

        </Button>
      </NavLink>
      <img
        style={{ height: "55px", float: "right" }}
        src={Background}
        alt=" Background "
      />
      &nbsp;
      <Button
        visible={!changeText}
        style={{
          backgroundColor: "white",
          height: "37px",
          width: "37px",
          color: "#203570",
        }}
        icon="pi pi-bookmark"
        className=" p-button-raised p-button-text"
        onClick={(e)=>bookmark(e,bookmarkValue)}
        tooltip="Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"

      />
      <Button
        visible={changeText}
        style={{
          backgroundColor: "white",
          height: "37px",
          width: "37px",
          color: "#203570",
        }}
        icon="pi pi-bookmark-fill"
        className=" p-button-raised p-button-text"
        onClick={(e)=>bookmark(e,unBookmarkValue)}
        tooltip=" Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"

      />
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "37px",
          width: "37px",
          color: "#203570",
        }}
        icon="pi pi-download"
        onClick={() => {
          downloadFileAtURL(DOC_FILE_URL);
        }}
        onMouseDown={docDownload}
        tooltip="Download "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-raised p-button-text"
      // onMouseDown={docDownload}
      />{" "}
      &nbsp;
      {/* <Button
        style={{
          backgroundColor: "white",
          height: "37px",
          width: "37px",
          color: "#203570",
        }}
        tooltip="Share "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        icon="pi pi-external-link"
        className=" p-button-raised p-button-text"
      /> */}
      {/* &nbsp; */}
      <Button
        style={{
          backgroundColor: "white",
          height: "37px",
          width: "37px",
          color: "#203570",
        }}
        icon="pi pi-upload"
        tooltip="Upload "
        className=" p-button-raised p-button-text"
        tooltipOptions={{
          className: "teal-tooltip",
          position: "bottom",
        }}
        onClick={() => onClick("displayBasic2")}
      />
      <Dialog
        header="Upload particular version"
        visible={displayBasic2}
        style={{ width: "35vw" }}
        footer={documentUpload("displayBasic2")}
        onHide={() => onHide("displayBasic2")}
      >
        <form onSubmit={versionUpload}>
          <input
            style={{
              marginTop: "15px",
              marginLeft: "15px",
            }}
            type="file"
            onChange={UpdatedDocument}
          />
          {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
        </form>
      </Dialog>
      &nbsp;

      <Dropdown
        style={{ backgroundColor: "white", color: "#203570" }}
        placeholder="Select "
        className="custom-dropdown"

        value={versiondata}
        options={values}
        onChange={(e) => onSelectVersion(e.value)}
        optionLabel="version"
        optionValue="version"
      />
      {/* )} */}


      <br />
      <br />
      {/* style={{height:"80vh"}} */}
      <Card >
        <Button
          style={{
            backgroundColor: "white",
            float: "right",
            color: "black",
            height: "37px",
          }}
          className=" p-button p-button-secondary p-button-text"
          onClick={() => onClick("displayBasic")}
        >
          <img
            style={{ width: "15px", marginRight: "5px", height: "15px" }}
            src={plus}
            alt="plus "
          />
          <p style={{ color: "#203570" }}> Add Keywords</p>
        </Button>
        <Dialog
          icon="pi pi-plus-circle"
          header="Add Keyword"
          visible={displayBasic}
          style={{ width: "25vw" }}
          footer={renderFooter("displayBasic")}
          onHide={() => onHide("displayBasic")}
        >
          <InputText
            type="text "
            style={{ width: "100%", borderRadius: "2px", height: "7vh" }}
            placeholder="Enter Keyword "
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </Dialog>

        {users.map((keywords) => (
          <Tag
            style={{
              backgroundColor: "#D4EBE9",
              color: "#203570",
              marginRight: "3px",
              borderRadius: "12px",
              marginTop: "3px"
            }}

            onClick={() => onClick("displayBasic3", keywords)}
            icon="pi pi-times"

          >
            {keywords}
          </Tag>

        ))}
  
        <Dialog
          header="Delete Keyword ?"
          visible={displayBasic3}
          style={{ width: "30vw" }}
          footer={deletekeyword("displayBasic3")}
          onHide={() => onHide("displayBasic3")}
        >
          <p>Are you sure you want to delete this keyword ?</p>
        </Dialog>



        {/* //Add section */}
        <Dialog
          header="Update particular section"
          visible={displayBasic6}
          style={{ width: "35vw" }}

          footer={sectionupload("displayBasic6")}
          onHide={() => onHide("displayBasic6")}
        >
          <form onSubmit={handleSubmit}>
            <input
              style={{
                marginTop: "15px",
                marginLeft: "15px",
              }}
              type="file"
              onChange={Documentupload}
            />
            {errors.file && <div style={{ color: "red" }}>{errors.file}</div>}
          </form>
        </Dialog>

  
    <br/>
    <br/>
    <hr />
       
        <DataTable
          value={section}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          stripedRows


          paginatorRight={paginatorRight}
        >

          <Column field="sectionName" style={{ minWidth: "10rem" }} header="Identified Sections"></Column>
          {/* <Column field="sectionversion" style={{ minWidth: "10rem" }} body={(e) => sectionBodyTemplate(e)} header="Section version"></Column> */}

          <Column header="Actions" bodyStyle={{ width: "11rem" }} bodyClassName="custom-body" body={(e) => actionBodyTemplate(e)} ></Column>




        </DataTable>

        <br />
      </Card>
    </div>
  );
};
export default Product;

