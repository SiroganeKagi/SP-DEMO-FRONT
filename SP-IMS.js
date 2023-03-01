var v1 = new Vue({
  el: "#app",
  methods: {
    async getDate(pageNum) {
      const { data: res } = await axios({
        method: "get",
        url: "http://localhost:8080/get/programList",
        params: {
          pageNum,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      this.tableData = res.data;
    },

    pageChange(pageNum) {
      console.log(pageNum);
      if (pageNum <= 0) {
        return;
      } else {
        this.getDate(pageNum);
      }
    },

    async search(typeId, num, name) {
      const { data: res } = await axios({
        method: "get",
        url: "http://localhost:8080/search/program",
        params: {
          typeId: typeId,
          num: num,
          name: name,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      this.tableData = res.data;
    },

    async add(typeIdNew,nameNew,actorNameNew,pointNew) {
      const { data: res } = await axios({
        method: 'post',
        url: 'http://localhost:8080/add/program',
        data: {
          typeId: typeIdNew,
          name: nameNew,
          actorName: actorNameNew,
          point: pointNew,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      if(res.code==="00000"){
        alert('添加成功！');
        window.location.reload();
      };
    },

    async delete(id) {
      const { data: res } = await axios({
        method: 'post',
        url: 'http://localhost:8080/delete/program',
        params: {
          programId:id,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      if(res.code==="00000"){
        alert('删除成功！');
        window.location.reload();
      };
    },

    deleteConfirm (row) {
      console.log(row);
      if(confirm('确定要删除吗')==true){
        this.delete(row.id)
      }
    },

    async update(typeIdUp,nameUp,actorNameUp,pointUp) {
      const { data: res } = await axios({
        method: 'post',
        url: 'http://localhost:8080/update/program',
        data: {
          programId:programId,
          typeId:typeIdUp,
          name:nameUp,
          actorName:actorNameUp,
          point:pointUp,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      if(res.code==="00000"){
        alert('编辑成功！');
        window.location.reload();
      };
    },
    handleClick(row) {
      console.log(row);
      programId=row.id;
    },
    
  },
  
  data() {
    return {
      tableData: [],
      pageNum: 1,
      typeId: null,
      num: 0,
      name: "",
      showForm1: false,
      nameNew: '',
      typeIdNew:null,
      actorNameNew: '',
      pointNew: '',
      id: 0,
      showForm2: false,
      programId:0,
      nameUp: '',
      typeIdUp:null,
      actorNameUp: '',
      pointUp: '',
    };
  },
  created() {
    this.getDate(this.pageNum);
  },
});
