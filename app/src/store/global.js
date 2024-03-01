import { getField, updateField } from 'vuex-map-fields';
import dishesData from '@/data/dishes.json';

export default {
	namespaced: true,

	state() {
		return {
			meal: '',
			numberPeople: 1,
			selectedRestaurant: '',
			listOrder: [],
			idDishes: 1,

			restaurants: [],
			listDishes: [],
			allDishes: dishesData.dishes,

			dishSelected: [{ name: '' }],
			checkInfoChange: { meal: '', selectedRestaurant: '' },
		};
	},

	actions: {
		async getRestaurant({ state }) {
			const lunchDishes = state.allDishes.filter((dish) =>
				dish.availableMeals.includes(state.meal)
			);

			let arr = [];
			for (let i = 0; i < lunchDishes.length; i++) {
				let current = lunchDishes[i].restaurant;
				if (!arr.find((value) => value === current)) {
					arr = [...arr, current];
				}
			}

			if (!arr.find((value) => value === state.selectedRestaurant)) {
				state.selectedRestaurant = '';
			}
			state.restaurants = arr;
		},

		async getDish({ dispatch, state }) {
			// handle dishes when servuring = 0
			dispatch('handleNotServuring')

			if (
				state.checkInfoChange.meal != state.meal || state.checkInfoChange.selectedRestaurant !=state.selectedRestaurant
			) {
				state.listOrder = [];
				state.checkInfoChange = {
					meal: state.meal,
					selectedRestaurant: state.selectedRestaurant,
				};
			}

			const listDish = state.allDishes.filter(
				(value) =>
					value.restaurant === state.selectedRestaurant &&
					value.availableMeals.find((meal) => meal === state.meal)
			);

			state.listDishes = listDish;
		},

		async getReview({ dispatch }) {
			dispatch('handleNotServuring')
		},

		handleNotServuring({ state }) {
			state.dishSelected = state.dishSelected.filter(
				(dish) =>!state.listOrder.find((item) =>item.selectedDish === dish.name && item.servings === 0
					)
			);
			state.idDishes = state.dishSelected.length;
			state.listOrder = state.listOrder.filter(
				(item) => item.servings > 0
			);
			state.listOrder = state.listOrder.map((value, idx) => {
				value.id = idx + 1
				return value
				
			})
			
		}
	},

	mutations: {
		updateField,
		SET_MEAL(state, payload) {
			state.meal = payload.meal;
			state.numberPeople = payload.numberPeople;
		},
		SET_SELECTED_RESTAURANT(state, payload) {
			state.selectedRestaurant = payload;
		},
		SET_LIST_ORDER(state, payload) {
			state.listOrder = payload;
		},

		SET_DISH_SELECTED(state, payload) {
			state.dishSelected = payload;
		},
		SET_ID_DISHES(state, payload) {
			state.idDishes = payload;
		},
	},

	getters: {
		getField,
	},
};
