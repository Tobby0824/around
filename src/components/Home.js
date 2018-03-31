import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {API_ROOT, AUTH_PREFIX, GEO_OPTIONS, TOKEN_KEY} from "../constants";
import $ from 'jquery';
import { Gallery} from "./Gallery";
import {CreatePostButton} from "./CreatePostButton"

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingPosts: false,
        loadingGeoLocation: false,
        error: '',
        posts: [],
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
        const {latitude, longitude} = position.coords;
        //const lat = 37.7915953;
        //const lon = -122.3937977;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon : longitude}));
        //localStorage.setItem('POS_KEY', JSON.stringify({lat, lon}));
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
        } else if(this.state.loadingPosts) {
            return <Spin tip="Loading Nearby Posts..."/>;
        } else if(this.state.posts && this.state.posts.length > 0) {
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    caption: post.message,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                }
            });
            return <Gallery images={images}/>;
        } else {
            return null;
        }

    }

    loadNearbyPosts = (position) => {
        const lat = 37.535623;
        const lon = -122.26956;
        this.setState({loadingPosts: true});
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
               Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response)=> {
            console.log(response);
            this.setState({posts: response, loadingPosts: false, error: ''});
        }, (response) => {
            console.log(response.responseText);
            this.setState({loadingPosts: false, response: response.responseText});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const operations =<CreatePostButton/>;
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