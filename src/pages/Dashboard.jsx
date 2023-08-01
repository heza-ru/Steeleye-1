import { useState, useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("SE|20221104|179|9:1:NEWO");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [numOrders, setNumOrders] = useState(0);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [clickedRowId, setClickedRowId] = useState("SE|20221104|179|9:1:NEWO");

  useEffect(() => {
    // Calculate the number of orders
    setNumOrders(mockData.results.length);
  }, []);

  // useEffect(() => {
  //   // Filter the orders based on the search text
  //   const filtered = mockData.results.filter((item) => item['&id'].toLowerCase() === searchText);
  //   setFilteredOrders(filtered);
  // }, [searchText]);

  useEffect(() => {
    // Filter the orders based on the search text
    const filtered = mockData.results.filter((item) =>
    item['&id'].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchText]);

  useEffect(() => {
    const desiredId = clickedRowId.toString();

    // Find the data for the desired ID
    const dataForId = mockData.results.find((item) => item["&id"] === desiredId);

    setSelectedOrderDetails(dataForId.executionDetails);
  }, [clickedRowId]);

  useEffect(() => {
    const desiredId = clickedRowId.toString();

    // Find the data for the desired ID
    const dataForId = timestamps.results.find((item) => item["&id"] === desiredId);

    setSelectedOrderTimeStamps(dataForId.timestamps);
  }, [clickedRowId]);

  // Function to handle the clicked row
  const handleRowClick = (id) => {
    setClickedRowId(id);
  };

  useEffect(() => {
    console.log("Clicked Row ID:", clickedRowId);
  }, [clickedRowId]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${numOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} time={timestamps} cur={currency} onRowClick={handleRowClick}/>
      </div>
    </div>
  );
};

export default Dashboard;
