function CallApi(){
    this.fetchListData = function(){
        return axios({
            url: "https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
            method: "GET",
        })
    }

    this.deleteNV = function(id){
        return axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
            method: "DELETE",
        })
    }

    this.addNV = function(nv){
        return axios({
            url: "https://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
            method: "POST",
            data: nv,
        })
    }

    this.getNVByID = function(id){
        return axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
            method: "GET",
        })
    }

    this.updateNV = function(nv){
        return axios({
            url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`,
            method: "PUT",
            data: nv,
        })
    }
}