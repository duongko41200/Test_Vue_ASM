import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import homeLayout from '@/pages/home/homeLayout.vue';
import StepFirst from '@/components/StepFirst/StepFirst.vue';
import StepSend from '@/components/StepSend/StepSend.vue';
import StepThree from '@/components/StepThree/StepThree.vue';
import Review from '@/components/Review/Review.vue';

const routes = [
	{
		name: 'HomeLayout',
		path: '/',
		component: homeLayout,
		children: [
			{
				name: '',
				path: '/',
				component: StepFirst,
			},
			{
				name: '',
				path: '/step2',
				component: StepSend,
			},
			{
				name: '',
				path: '/step3',
				component: StepThree,
			},
			{
				name: '',
				path: '/review',
				component: Review,
			},
		],
	},
];
const router = Router();
function Router() {
	const router = new createRouter({
		history: createWebHistory(),
		routes,
	});

	return router;
}
router.beforeEach(async (to, from, next) => {

	if (['/step2', '/step3', '/review'].includes(to.path)) {
		
		if (!store.state.global.meal) {
			
			next("/");
		}
	
	}
	next();
});

export default router;
