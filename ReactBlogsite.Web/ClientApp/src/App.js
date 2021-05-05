import React, {Component} from 'react';
import { render } from 'react-dom';
import {Route} from 'react-router';
import Home from './Home';
import Layout from './Layout';
import ViewBlog from './ViewBlog';
import Admin from './Admin';
import MostRecent from './MostRecent';

export default class app extends React.Component{
    render() {
        return(
            <Layout>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/viewblog/:id' component={ViewBlog}></Route>
                <Route exact path='/Admin' component={Admin}></Route>
                <Route exact path='/mostRecent' component={MostRecent}></Route>
            </Layout>
        )
    }
}
