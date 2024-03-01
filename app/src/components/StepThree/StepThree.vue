<template>
	<div>
		<div class="font-bold text-lg">Order</div>
		<div
			class="flex flex-col gap-2 max-h-[200px] overflow-y-auto p-2 mb-2"
		>
			<div
				class="flex justify-between"
				v-for="(dish, idx) in dishes"
				:key="idx"
			>
				<div>
					<label id="listbox-label" class="block text-sm text-left mb-2"
						>Please Select a Dish</label
					>
					<select
						id="currency"
						name="currency"
						class="border flex-1 pl-4 w-[250px] h-[25px]"
						v-model="dish.selectedDish"
						@change="getDataDish(dish.id, dish.selectedDish)"
						required
					>
						<option v-for="(item, idx) in dish.list" :key="idx">
							{{ item.name }}
						</option>
					</select>
				</div>

				<div>
					<label id="listbox-label" class="block text-sm text-left mb-2"
						>Please enter no. of servings</label
					>
					<input
						type="number"
						min="1"
						max="10"
						class="border flex-1 pl-4 w-[150px] h-[25px]"
						v-model="dish.servings"
						@change="getDataDish(dish.id, dish.selectedDish)"
						required
					/>
				</div>
			</div>
		</div>

		<div>
			<div
				class="rounded-full border flex justify-center items-center w-[30px] h-[30px] bg-gray-400"
				@click="addDish"
			>
				<icon icon="fa-solid fa-plus" style="font-size: 20px" />
			</div>
		</div>
	</div>
</template>

<script src="./StepThree">

</script>
