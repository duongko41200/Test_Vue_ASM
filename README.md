# Fabbi Vue Assignment 1


<!-- toc -->

## LINK DEMO
[KẾT QUẢ ĐẠT ĐƯỢC ](https://test-vue-asm.vercel.app/)

<!-- tocstop -->

## Requirements

### Must

- Use `Vue`
- Use `ES6+`
- Use `Composition API`


## Description

Biểu mẫu này nhằm mục đích giúp người dùng đặt trước món ăn từ các nhà hàng, dữ liệu về nhà hàng và các mặt hàng thực phẩm và được cung cấp trong thư mục dữ liệu 


### Step 1

- Người dùng chọn Danh mục bữa ăn (bữa sáng, bữa trưa hoặc bữa tối).
- Họ cũng cần nhập số lượng người (tối đa 10)
Cả hai đều phải là trường bắt buộc.

---


### Step 2

- Người dùng chọn nhà hàng thích hợp cung cấp bữa ăn dựa trên lựa chọn ở bước đầu tiên.
Đây cũng là một lĩnh vực bắt buộc.
---


### Step 3

- Người dùng chọn món ăn muốn đặt trước dựa trên bữa ăn và nhà hàng họ đã chọn ở hai bước đầu tiên.

- Đầu tiên họ chọn một món ăn

- Họ cũng có thể thêm một số khẩu phần của món ăn (mặc định là 1)

- Ngoài ra, người dùng không thể chọn cùng một món ăn hai lần mà hãy thêm nhiều phần ăn hơn.

Tổng số món ăn (tức là Số món * khẩu phần tương ứng) phải lớn hơn hoặc bằng số người được chọn ở bước đầu tiên và cho phép tối đa là 10 món.

---

### Step 4

Ở bước cuối cùng, người dùng có thể xem lại tất cả các lựa chọn trước đó của mình và nhấp vào gửi

## Notes

- Người dùng không thể tiến hành bước tiếp theo trừ khi họ có thông tin đầu vào hợp lệ ở bước hiện tại.
- nếu thông tin đầu vào của họ không hợp lệ, hãy hiển thị các lỗi xác thực thích hợp.
- Ở bất kỳ bước nào, người dùng có thể quay lại và thay đổi tùy chọn của họ ở bất kỳ bước nào trước đó.
- Cuối cùng, khi người dùng gửi biểu mẫu, chỉ cần ghi dữ liệu vào bảng điều khiển vì hiện tại chúng tôi không cung cấp bất kỳ phần phụ trợ nào.
Các chi tiết tốt hơn về UX sẽ do bạn quyết định

### ⚙ Cài đặt

1. Clone project này

```
  git clone https://github.com/duongko41200/Test_Vue_ASM.git
```

2. Cài đặt thư viện ở Frontend

```
  cd ./app
  npm install 
```


3. Chạy project

```

  npm run serve
```
