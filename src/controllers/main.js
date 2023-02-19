var callApi = new CallApi();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function resetForm() {
  getEle("formNV").reset();
}


function getListData() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListData();

function renderData(data) {
  var contentHTML = "";
  data.forEach(function (nv, i) {
    var xepLoai = "";
    if (nv.soGioLamTrongThang >= 50 && nv.soGioLamTrongThang < 70) {
        xepLoai = "Trung bình";
      }
    if (nv.soGioLamTrongThang >= 70 && nv.soGioLamTrongThang < 100) {
      xepLoai = "Khá";
    }
    if (nv.soGioLamTrongThang >= 100 && nv.soGioLamTrongThang < 130) {
      xepLoai = "Giỏi";
    }
    if (nv.soGioLamTrongThang >= 130 && nv.soGioLamTrongThang <= 150) {
      xepLoai = "Xuất sắc";
    }
    contentHTML += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.luongCoBan * nv.heSoChucVu}</td>
            <td>${nv.soGioLamTrongThang}</td>
            <td>${xepLoai}</td>
            <td>
                <button class="btn btn-info" onclick="handleEdit(${
                  nv.maNhanVien
                })">Sửa</button>
                <button class="btn btn-danger" onclick="handleDelete(${
                  nv.maNhanVien
                })">Xóa</button>
            </td>
        </tr>
        `;
  });

  getEle("tableDanhSach").innerHTML = contentHTML;
}

/**
 * Lay thong tin nhap vao
 */
function getInfoNV() {
  var maNV = getEle("maNV").value;
  var tenNV = getEle("tenNV").value;
  var chucVu = getEle("chucVu").value;
  var luong = getEle("luong").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;

  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "(*)Vui lòng nhập MaNV") &&
    validation.kiemTraSo(maNV, "tbMaNV", "MaNV phải là số") &&
    validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", 4, 6);

  isValid &=
    validation.kiemTraRong(tenNV, "tbTenNV", "(*)Vui lòng nhập TenNV") &&
    validation.kiemTraChuoiKyTu(
      tenNV,
      "tbTenNV",
      "(*)Tên nhân viên phải là chữ"
    );

  isValid &=
    validation.kiemTraRong(luong, "tbLuong", "(*)Vui lòng nhập lương") &&
    validation.kiemTraLuong(
      luong,
      "tbLuong",
      "(*)Vui lòng nhập lương từ 1000000 -> 20000000"
    );

  isValid &=
    validation.kiemTraRong(gioLam, "tbGioLam", "(*)Vui lòng nhập giờ làm") &&
    validation.kiemTraSoGioLam(
      gioLam,
      "tbGioLam",
      "(*)Vui lòng nhập giờ làm từ 50 =>150"
    );

  if (!isValid) return null;

  var heSoChucVu = "";
  if (chucVu === "Nhân viên") {
    heSoChucVu = 1;
  }
  if (chucVu === "Quản lý") {
    heSoChucVu = 2;
  }
  if (chucVu === "Giám đốc") {
    heSoChucVu = 3;
  }

  var nv = new NhanVien(maNV, tenNV, chucVu, heSoChucVu, luong, gioLam);
  return nv;
}

/**
 * Add NhanVien
 */
getEle("addNV").addEventListener("click", function () {
  var nv = getInfoNV();
  // console.log(nv);
  callApi
    .addNV(nv)
    .then(function () {
      getListData();
      alert("Thêm Nhân viên thành công");
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });

  
});

/**
 * Delete NhanVien
 */
function handleDelete(id) {
  console.log(id);
  callApi
    .deleteNV(id)
    .then(function (result) {
      getListData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit NhanVien
 */
function handleEdit(id) {
  //   console.log(id);
  getEle("addNV").style.display = "none";
  document.getElementsByClassName("button-update")[0].innerHTML = `
        <button id="btnUpdate" class="btn btn-info" onclick="handleUpdate(${id})">Cập nhật nhân viên</button>
    `;

  callApi
    .getNVByID(id)
    .then(function (result) {
      var nv = result.data;
      getEle("maNV").value = nv.maNhanVien;
      getEle("maNV").disabled = true;
      getEle("tenNV").value = nv.tenNhanVien;
      getEle("chucVu").value = nv.chucVu;
      getEle("luong").value = nv.luongCoBan;
      getEle("gioLam").value = nv.soGioLamTrongThang;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update NhanVien
 */
function handleUpdate(id) {
  // console.log(id);
  var maNV = getEle("maNV").value;
  var tenNV = getEle("tenNV").value;
  var chucVu = getEle("chucVu").value;
  var luong = getEle("luong").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;

  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "(*)Vui lòng nhập MaNV") &&
    validation.kiemTraSo(maNV, "tbMaNV", "MaNV phải là số") &&
    validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", 4, 6);

  isValid &=
    validation.kiemTraRong(tenNV, "tbTenNV", "(*)Vui lòng nhập TenNV") &&
    validation.kiemTraChuoiKyTu(
      tenNV,
      "tbTenNV",
      "(*)Tên nhân viên phải là chữ"
    );

  isValid &=
    validation.kiemTraRong(luong, "tbLuong", "(*)Vui lòng nhập lương") &&
    validation.kiemTraLuong(
      luong,
      "tbLuong",
      "(*)Vui lòng nhập lương từ 1000000 -> 20000000"
    );

  isValid &=
    validation.kiemTraRong(gioLam, "tbGioLam", "(*)Vui lòng nhập giờ làm") &&
    validation.kiemTraSoGioLam(
      gioLam,
      "tbGioLam",
      "(*)Vui lòng nhập giờ làm từ 50 =>150"
    );

  if (!isValid) return null;

  var heSoChucVu = "";
  if (chucVu === "Nhân viên") {
    heSoChucVu = 1;
  }
  if (chucVu === "Quản lý") {
    heSoChucVu = 2;
  }
  if (chucVu === "Giám đốc") {
    heSoChucVu = 3;
  }

  var nv = new NhanVien(maNV, tenNV, chucVu, heSoChucVu, luong, gioLam);
  callApi
    .updateNV(nv, id)
    .then(function () {
      getListData();
      alert("Cập nhật Nhân viên thành công");
      getEle("addNV").style.display = "block";
      getEle("btnUpdate").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
    });

  resetForm();
  getEle("maNV").disabled = false;
}
