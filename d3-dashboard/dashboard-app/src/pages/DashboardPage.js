import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
const DashboardItems = [
  {
    id: 0,
    name: "Orders Count by City",
    vizState: {
      query: {
        measures: ["orders.count"],
        dimensions: ["users.city"]
      },
      chartType: "pie"
    }
  },
  {
    id: 1, 
    name: "Orders Count by Status and City",
    vizState: {
      query: {
        measures: ["orders.count"],
        dimensions: ["users.city", "orders.status"],
      },        order: "desc",
      chartType: "bar",
      pivotConfig: {
        x: ["users.city"],
        y: ["orders.status", "measures"]
      }
    }
  },
  {
    id: 3,
    name: "Orders Count by Gender [Pre-aggregated]",
    vizState: {
      query: {
        measures: ["orders.count"],
        dimensions: ["users.gender"],
        filters: []
      },
      chartType: "bar"
    }
  },
  {
    id: 4,
    name: "Orders Count by Product Category",
    vizState: {
      query: {
        measures: ["orders.count"],
        dimensions: ["product_categories.name"]
      },
      chartType: "bar"
    }
  }
];

const dashboardItemsWithFilter = (dashboardItems, statusFilter) => {
  if (statusFilter === "all") {
    return dashboardItems;
  }

  const statusFilterObj = {
    member: "orders.status",
    operator: "equals",
    values: [statusFilter]
  };

  return dashboardItems.map(({ vizState, ...dashboardItem }) => (
    {
      ...dashboardItem,
      vizState: {
        ...vizState,
        query: {
          ...vizState.query,
          filters: (vizState.query.filters || []).concat(statusFilterObj),
        },
      }
    }
  ))
};

const DashboardPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const dashboardItem = item => (
    <Grid item xs={12} lg={6} key={item.id}>
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Grid>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <Typography variant="h5" color="inherit">
        There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
    </div>
  );

  return DashboardItems.length ? ([
    <ButtonGroup style={{ padding: "24px 24px 0 24px" }} color="primary">
      {["all", "processing", "completed", "shipped"].map(value => (
        <Button
          variant={value === statusFilter ? "contained" : ""}
          onClick={() => setStatusFilter(value)}>
          {value.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>,
    <Dashboard>{dashboardItemsWithFilter(DashboardItems, statusFilter).map(dashboardItem)}</Dashboard>
  ]) : (
    <Empty />
  );
};

export default DashboardPage;
