axios({
    method: "get",
    url: "http://localhost:3000/read",
    params: {
      name: "coderwhy",
      age: 18
    }
  }).then(res => {
    console.log("请求结果:", res);
  }).catch(err => {
    console.log("错误信息:", err);
  });
