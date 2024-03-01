const conditionStep1 = ({ meal, numberPeople }) => {
	if (!meal ) return "Không được bỏ trống bữa ăn";
	
	if (numberPeople <= 0) return "số lượng người phải lớn hơn 0";
	
	if(numberPeople > 10 ) return "số lượng người phải nhỏ hơn 11";

	return true;
};

const conditionStep2 = ({ selectedRestaurant }) => {
	if (!selectedRestaurant) return "Hãy chọn nhà hàng bạn muốn ăn";

	return true;
};

const conditionStep3 = ({ listOrder, numberPeople }) => {
	let totalServing = 0;
	for (let i = 0; i < listOrder.length; i++) {
		totalServing += listOrder[i].servings;
	}

	for (let i = 0; i < listOrder.length; i++) {
		if (!listOrder[i].selectedDish) {
			return 'không bỏ trống thông tin món, muốn bỏ món thì chuyển số lượng về 0';
		}
		if (totalServing < numberPeople) {
			return `Vẫn chưa đủ khẩu phần ăn cho ${numberPeople} người`;
		}
	}

	return true;
};

export { conditionStep1, conditionStep2, conditionStep3 };
