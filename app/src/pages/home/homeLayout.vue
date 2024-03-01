<template>
	<div
		class="wapper w-[45%] md:min-h-[70%] 2xl:min-h-[50%] max-h-min flex justify-center border p-2 bg-white rounded shadow-sm"
	>
		<div class="flex flex-col gap-16 w-full p-4 h-full">
			<div class="step flex w-full justify-center">
				<div
					v-for="(list, idx) in listStep"
					:key="idx"
					class="border p-1 px-4"
					:class="list.isActive ? 'bg-sky-300 ' : ''"
				>
					<div>{{ list.step }}</div>
				</div>
			</div>

			<div
				class="step-body p-2 rounded shadow-md h-[80%] border border-slate-100"
			>
				<router-view />
			</div>

			<div class="footer flex justify-between">
				<div>
					<div
						v-if="currentStep > 0"
						class="border p-1 px-2 shadow-sm cursor-pointer hover:bg-gray-100"
						@click="handlePrevious"
					>
						Previous
					</div>
				</div>
				<div>
					<div
						v-if="currentStep < 3"
						class="border p-1 px-2 shadow-sm cursor-pointer hover:bg-gray-100"
						@click="handleNext"
					>
						Next
					</div>
					<div
						v-else
						class="border p-1 px-2 shadow-sm cursor-pointer hover:bg-green-500 bg-green-400 text-white"
						@click="handleSubmit"
					>
						Submit
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {
	conditionStep1,
	conditionStep2,
	conditionStep3,
} from '@/utils/condition';
import { useToast } from 'vue-toast-notification';

const STEP_2 = 1;
const STEP_3 = 2;
const STEP_REVIEW = 3;

export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		const toast = useToast();

		const listStep = ref([
			{ id: 1, step: 'step 1', path: '/', isActive: true },
			{ id: 2, step: 'step 2', path: '/step2', isActive: false },
			{ id: 3, step: 'step 3', path: '/step3', isActive: false },
			{ id: 4, step: 'Review', path: '/review', isActive: false },
		]);
		const currentStep = ref(0);

		const meal = computed(() => store.state.global.meal);
		const numberPeople = computed(
			() => store.state.global.numberPeople
		);
		const selectedRestaurant = computed(
			() => store.state.global.selectedRestaurant
		);
		const listOrder = computed(() => store.state.global.listOrder);

		//handle logic
		const handleNext = () => {
			const checkStep1 = conditionStep1({
				meal: meal.value,
				numberPeople: numberPeople.value,
			});
			const checkStep2 = conditionStep2({
				selectedRestaurant: selectedRestaurant.value,
			});
			const checkStep3 = conditionStep3({
				listOrder: listOrder.value,
				numberPeople: numberPeople.value,
			});

			const currentStepIndex = listStep.value.findIndex(
				(step) => step.isActive
			);


			if (currentStepIndex === 0 && checkStep1 !== true) {
				return toast.error(checkStep1, {
					position: 'top-right',
					duration: 2000,
				});
			}
			if (currentStepIndex === 1 && checkStep2 !== true) {
				return toast.error(checkStep2, {
					position: 'top-right',
					duration: 2000,
				});
			}
			if (currentStepIndex === 2 && checkStep3 !== true) {
				return toast.error(checkStep3, {
					position: 'top-right',
					duration: 2000,
				});
			}

			currentStep.value = currentStepIndex + 1;

			if (
				currentStepIndex !== -1 &&
				currentStepIndex < listStep.value.length - 1
			) {
				listStep.value[currentStepIndex].isActive = false;
				listStep.value[currentStepIndex + 1].isActive = true;
				changeStep(currentStepIndex + 1);
			}
		};

		const handlePrevious = () => {
			const currentStepIndex = listStep.value.findIndex(
				(step) => step.isActive
			);
			currentStep.value = currentStepIndex - 1;
			if (currentStepIndex > 0) {
				listStep.value[currentStepIndex].isActive = false;
				listStep.value[currentStepIndex - 1].isActive = true;
				changeStep(currentStepIndex - 1);
			}
		};

		const changeStep = async (step) => {
			switch (step) {
				case STEP_2:
					await store.dispatch('global/getRestaurant');
					break;
				case STEP_3:
					await store.dispatch('global/getDish');
					break;
				case STEP_REVIEW:
					await store.dispatch('global/getReview');
					break;
				default:
					break;
			}
			router.push(listStep.value[step].path);
		};

		const handleSubmit = () => [
			toast.success('Thông tin lưu thành công', {
				position: 'top-right',
				duration: 2000,
			}),

			console.log(
				` thông tin: meal: ${meal.value},No. of. People: ${
					numberPeople.value
				}, Reastuarant: ${
					selectedRestaurant.value
				},Dishes:${listOrder.value.map((dish) => JSON.stringify(dish.selectedDish))}`
			),
		];

		return {
			listStep,
			meal,
			numberPeople,
			currentStep,
			handleNext,
			handlePrevious,
			handleSubmit,
		};
	},
};
</script>

<style>

</style>
