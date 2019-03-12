import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	onDeleteClick() {
		this.props.deleteAccount();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			//Check if logged user has profile data
			if (Object.keys(profile).length) {
				dashboardContent = (
					<div>
						<p className='Lead text-muted'>
							Welcome
							<Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						{/* TODO: exp and edu */}
						<div style={{ marginBottom: '60px' }} />
						<button
							onClick={this.onDeleteClick.bind(this)}
							className='btn btn-danger'
						>
							Delete My Account
						</button>
					</div>
				);
			} else {
				//User is logged in but has no profile
				dashboardContent = (
					<div>
						<p className='Lead text-muted'>Welcome {user.name}</p>
						<p> You have not yet setup profile, please add some info</p>
						<Link to='/create-profile' className='btn btn-lg btn-info'>
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Dashboard.protoTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);