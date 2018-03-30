import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { GEO_OPTIONS } from "../constants";
import


const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        error: '',
    }
    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
            this.onSuccessGetGeoLocation, this.onFailedGeoLocation, GEO_OPTIONS);
        } else {
            /* geolocation IS NOT available */
        }

    }



    onSuccessGetGeoLocation = (position) => {
        console.log("success");
        console.log(position);
        this.setState({loadingGeoLocation: false, error:''});
       // const {latitude, longitude} = position.coords;
        const lat = 37.7915953;
        const lon = -122.3937977;
        //localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon : longitude}));
        localStorage.setItem('POS_KEY', JSON.stringify({lat, lon}));
        this.loadNearbyPosts(position);
    }

    onFailedGeoLocation = () => {
        console.log("fail get geolocation");
        this.setState({loadingGeoLocation: false, error:'Failed to load geo location'});
    }

    componentDidMount() {
        this.setState({loadingGeoLocation: true});
        this.getGeoLocation();
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading Geo Location..."/>;
        } else {
            return <div>content</div>;
        }

    }

    loadNearbyPosts = (position) => {

    }

    render() {
        const operations = <Button type="primary" >Create New Post</Button>;
        return(
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}