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
                    title: "账号管理",
                    key:"sub1-1",
                },
                component: () => import("../views/accountManagement/accountManagement.vue"),
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
                key:"sub2-2",
            },
            component: () => import("../views/teachingwokingload/teachingwokingload.vue"),
          },
          {
            path: "/home/seeUserwoking",
            name: "seeUserwoking",
            meta: {
                title: "查看教学工作量数据",
                key:"sub2-3",
            },
            component: () => import("../views/teachingwokingload/seeUserwoking.vue"),
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
          children: [
            {
                path: "/home/scientificResearch",
                name: "scientificResearch",
                meta: {
                    title: "科研工作量",
                    key:"sub2-1",
                },
                component: () => import("../views/collectionTableManagement/scientificResearch.vue"),
            },
            {
              path: "/home/other",
              name: "other",
              meta: {
                  title: "其他工作量",
                  key:"sub2-2",
              },
              component: () => import("../views/collectionTableManagement/other.vue"),
            },
            {
              path: "/home/collectionTable",
              name: "collectionTable",
              meta: {
                  title: "收集表",
                  key:"sub2-3",
              },
              component: () => import("../views/collectionTableManagement/collectionTable.vue"),
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