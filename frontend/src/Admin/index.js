import React from "react";
import AdminComponent from "./admin";
import { Route } from "wouter";
import Editor from "./Editor";
import Analytics from "./Analytics"
import TabPanel from "./Analytics/TabPanel";
import Diseases from "./Diseases";
import Genders from "./Genders";

function Admin() {
    return (
        <React.Fragment>
            <Route path="/admin">
                <AdminComponent />
            </Route>
            <Route path="/admin/editor/:rest*">
                <Editor />
            </Route>
            <Route path="/admin/analytics">
                <Analytics />
            </Route>
            <Route path="/admin/analytics/workbook/:rest*">
                <TabPanel />
            </Route>
            <Route path="/admin/diseases/:rest*">
              <Diseases />
            </Route>
            <Route path="/admin/genders/:rest*">
              <Genders />
            </Route>
        </React.Fragment>
    );
}

export default Admin;
