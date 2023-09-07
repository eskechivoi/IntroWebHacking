import { useState, useEffect } from 'react'
import userService from './services/user'
import Header from './header'
import ErrorPage from './error'

function Profile (props) {
    const [pagHtml, setPagHtml] = useState([])

    useEffect(() => {
        userService.getProfileData(props.userToken, props.userNum).then(response => {
            if (response.status === 200){
                const user = response.data
                setPagHtml(
                <>
                    <Header />
                    <div className="container rounded bg-white mt-5">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">Admin</span><span className="text-black-50">admin@mail.com</span><span> </span></div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile Settings</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value="" />{user.name}</div>
                                        <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname" />{user.surname}</div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value="" />{user.phoneNumber}</div>
                                        <div className="col-md-12"><label className="labels">Address Line</label><input type="text" className="form-control" placeholder="enter address line" value="" />{user.address}</div>
                                        <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter postcode" value="" /></div>
                                        <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter email" value="" />{user.email}</div>
                                        <div className="col-md-12"><label className="labels">Password</label><input type="text" className="form-control" placeholder="new password" value="" /></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" />{user.country}</div>
                                        <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" />{user.region}</div>
                                    </div>
                                    <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                                    <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value="" />{user.education}</div>
                                    <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" />{user.experience}</div>
                                    <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" />{user.additionalDetails}</div>                               
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )
            } else if (response.status === 401){
                setPagHtml(<ErrorPage code={401} name={'Unauthorised'} desc={'You must login before accessing your profile page.'}/>)
            }
        }).catch(error => {
            if (error.response && error.response.status === 403)
                setPagHtml(<ErrorPage code={401} name={'Unauthorised'} desc={'You must login before accessing your profile page.'}/>)
            else{
                console.log(error)
                setPagHtml(<ErrorPage code={500} name={'Server Error'} desc={'Can not communicate with server.'}/>)
            }
        })
    }, []);
    
    return pagHtml;
}

export default Profile;
