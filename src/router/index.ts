import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue"),
    children: [
      {
          path: "/home/accountManagement",
          name: "accountManagement",
          meta: {
              title: "账号管理",
              key:"sub1",
          },
        
          children: [
            {
                path: "/home/administrator",
                name: "administrator",
                meta: {
                    title: "管理员管理",
                    key:"sub1-1",
                },
                component: () => import("../views/accountManagement/administrator.vue"),
            },
          ]
      },
      {
        path: "/home/teachingwokingload",
        name: "teachingwokingload",
        meta: {
            title: "教学工作量",
            key:"sub3",
        },
        
        children: [
          {
              path: "/home/ImportWorkload",
              name: "ImportWorkload",
              meta: {
                  title: "导入教学工作量",
                  key:"sub2-1",
              },
              component: () => import("../views/teachingwokingload/ImportWorkload.vue"),
          },
          {
            path: "/home/workloadData",
            name: "workloadData",
            meta: {
                title: "教学工作量数据",
                key:"sub2-1",
            },
            component: () => import("../views/teachingwokingload/teachingwokingload.vue"),
        }
        ]
    },
      {
          path: "/home/collectionTableManagement",
          name: "collectionTableManagement",
          meta: {
              title: "收集表管理",
              key:"sub2",
          },
          component: () => import("../views/collectionTableManagement/collectionTableManagement.vue"),
          children: [
            {
                path: "/home/publishCollectionTable",
                name: "publishCollectionTable",
                meta: {
                    title: "发布收集表",
                    key:"sub2-1",
                },
                component: () => import("../views/collectionTableManagement/publishCollectionTable.vue"),
            },
            {
              path: "/home/CollectionTable",
              name: "CollectionTable",
              meta: {
                  title: "收集表列表",
                  key:"sub2-2",
              },
              component: () => import("../views/collectionTableManagement/CollectionTable.vue"),
          },
          ]
      },
      {
          path: "/home/integratedManagement",
          name: "integratedManagement",
          meta: {
              title: "综合管理",
              key:"sub4",
          },
          component: () => import("../views/integratedManagement/integratedManagement.vue"),
      },
      {
        path: "/home/visualizationAttempts",
        name: "visualizationAttempts",
        meta: {
            title: "可视化视图",
            key:"sub5",
        },
        component: () => import("../views/visualizationAttempts/visualizationAttempts.vue"),
    }
  ]
  },

];
const router = createRouter({
      history,
      routes
})
export default router