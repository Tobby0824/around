import React from 'react';
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS } from "../constants"

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
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
        this.setState({loadingGeoLocation: false});
       // const {latitude, longitude} = position.coords;
        const lat = 37.7915953;
        const lon = -122.3937977;
        //localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon : longitude}));
        localStorage.setItem('POS_KEY', JSON.stringify({lat, lon}));
    }

    onFailedGeoLocation = () => {
        console.log("fail get geolocation");
    }

    componentDidMount() {
        this.setState({loadingGeoLocation: true});
        this.getGeoLocation();
    }

    render() {
        const operations = <Button type="primary" >Create New Post</Button>;
        return(
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.state.loadingGeoLocation ? <span>Loading...</span> : null}
                </TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}