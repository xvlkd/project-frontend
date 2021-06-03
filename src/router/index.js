import Vue from 'vue';
import Router from 'vue-router';

const LoginPage = () => import('../components/LoginPage.vue');
const DashboardUser = () => import('../components/DashboardUser.vue');

function loadDashboardUser(view) {
	return () => import(`../components/DashboardUserContents/${view}.vue`)
}

Vue.use(Router);

const routes = [{
		name: 'Login Page',
		path: '/',
		component: LoginPage
	},
  {
    name: "DashboardUser",
    path: '/dashboard',
    component: DashboardUser,
	children: [{
		name: 'Aktivasi ATM',
		path: '/AktivasiATM',
		component: loadDashboardUser('AktivasiATM'),
	},
	
	{
		name: 'Problem Record',
		path: '/ProblemRecord',
		component: loadDashboardUser('ProblemRecord'),
	},
	
	{
		name: 'Record Keluhan Nasabah',
		path: '/RecordKelNasabah',
		component: loadDashboardUser('RecordKelNasabah'),
	},

	{
		name: 'Call Center Log',
		path: '/CallCentreLog',
		component: loadDashboardUser('CallCentreLog'),
	},

	{
		name: 'Relasi Rekening Mencurigakan',
		path: '/RelasiRekMencurigakan',
		component: loadDashboardUser('RelasiRekMencurigakan'),
	},
	{
		name: 'Reset Password',
		path: '/ResetPassword',
		component: loadDashboardUser('ResetPassword'),
	}
	]
  },
];

const router = new Router({
	mode: 'history',
	routes: routes
});

export default router;