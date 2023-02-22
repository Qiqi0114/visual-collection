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
        path: "/userInfo",
        name: "userInfo",
        component: () => import("../views/login/userInfo.vue"),
      },
      {
          path: "/home/accountManagement",
          name: "accountManagement",
          meta: {
              title: "账号管理",
              key:"sub1",
              icon:"Avatar"
          },
        
          children: [
            {
                path: "/home/administrator",
                name: "administrator",
                meta: {
                    title: "账号管理",
                    key:"sub1-1",
                    icon:"Setting"
                },
                component: () => import("../views/accountManagement/accountManagement.vue"),
            },
            {
              path: "/home/groupManagement",
              name: "groupManagement",
              meta: {
                  title: "用户组管理",
                  key:"sub1-2",
                  icon:"Setting"
              },
              component: () => import("../views/accountManagement/groupManagement.vue"),
            },
            {
              path: "/home/departManagement",
              name: "departManagement",
              meta: {
                  title: "系管理",
                  key:"sub1-3",
                  icon:"Setting"
              },
              component: () => import("../views/accountManagement/departManagement.vue"),
           },
          ]
      },
      {
        path: "/home/teachingwokingload",
        name: "teachingwokingload",
        meta: {
            title: "教学工作量",
            key:"sub2",
            icon:"TrendCharts"
        },
        children: [
          {
              path: "/home/ImportWorkload",
              name: "ImportWorkload",
              meta: {
                  title: "导入教学工作量",
                  key:"sub2-1",
                  icon:"DataLine"
              },
              component: () => import("../views/teachingwokingload/ImportWorkload.vue"),
          },
          {
            path: "/home/workloadData",
            name: "workloadData",
            meta: {
                title: "教学工作量数据",
                key:"sub2-2",
                icon:"DataLine"
            },
            component: () => import("../views/teachingwokingload/teachingwokingload.vue"),
          },
          {
            path: "/home/seeUserwoking",
            name: "seeUserwoking",
            meta: {
                title: "查看教学工作量数据",
                key:"sub2-3",
                icon:"DataLine"
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
              key:"sub3", 
              icon:"List"
          },
          children: [
            {
                path: "/home/scientificResearch",
                name: "scientificResearch",
                meta: {
                    title: "科研工作量",
                    key:"sub3-1",
                    icon:"Tickets"
                },
                component: () => import("../views/collectionTableManagement/scientificResearch.vue"),
            },
            {
              path: "/home/other",
              name: "other",
              meta: {
                  title: "其他工作量",
                  key:"sub3-2",
                  icon:"Tickets"
              },
              component: () => import("../views/collectionTableManagement/other.vue"),
            },
            {
              path: "/home/scientificResearchCollection",
              name: "scientificResearchCollection",
              meta: {
                  title: "收集科研工作量",
                  key:"sub3-3",
                  icon:"Tickets"
              },
              component: () => import("../views/collectionTableManagement/scientificResearchCollection.vue"),
            },
            {
              path: "/home/otherCollection",
              name: "otherCollection",
              meta: {
                  title: "收集其他工作量",
                  key:"sub3-4",
                  icon:"Tickets"
              },
              component: () => import("../views/collectionTableManagement/otherCollection.vue"),
            },
          ]
      },
      {
        path: "/home/userCollection",
        name: "userCollection",
        meta: {
            title: "提交收集表",
            key:"sub4",
            icon:"Checked"
        },
        children: [
          {
              path: "/home/userCollectionTable",
              name: "userCollectionTable",
              meta: {
                  title: "科研工作量",
                  key:"sub5-1",
                  collectionTableParentId:'1',
                  icon:"Edit"
              },
              component: () => import("../views/collectionTableManagement/userCollectionTable.vue"),
          },
          {
            path: "/home/userOtherCollectionTable",
            name: "userOtherCollectionTable",
            meta: {
                title: "其他工作量",
                key:"sub5-2",
                collectionTableParentId:'8',
                icon:"Edit"
            },
            component: () => import("../views/collectionTableManagement/userCollectionTable.vue"),
        },
          {
            path: "/home/CollectionTable",
            name: "CollectionTable",
            meta: {
                title: "收集表",
                key:"sub5-3",
                icon:"Edit"
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
              key:"sub7",
          },
          component: () => import("../views/integratedManagement/integratedManagement.vue"),
      },
      {
        path: "/home/visualizationAttempts",
        name: "visualizationAttempts",
        meta: {
            title: "可视化视图",
            key:"sub6",
            icon:"Histogram"
        },
        children: [
          {
              path: "/home/visualizationAttempts",
              name: "visualizationAttempts",
              meta: {
                  title: "教学工作量可视化",
                  key:"sub6-1",
                  icon:"DataAnalysis"
              },
              component: () => import("../views/visualizationAttempts/visualizationAttempts.vue"),
          },
          {
            path: "/home/visualizationAttempts_2",
            name: "visualizationAttempts",
            meta: {
                title: "科研工作量可视化",
                key:"sub6-2",
                icon:"DataAnalysis"
            },
            component: () => import("../views/visualizationAttempts/visualizationAttempts_2.vue"),
        },
        {
          path: "/home/visualizationAttempts_3",
          name: "visualizationAttempts",
          meta: {
              title: "其他工作量可视化",
              key:"sub6-3",
              icon:"DataAnalysis"
          },
          component: () => import("../views/visualizationAttempts/visualizationAttempts_3.vue"),
      },
        ]
    }
  ]
  },

];
const router = createRouter({
      history,
      routes
})
export function resetRouter(): void {

}
export default router