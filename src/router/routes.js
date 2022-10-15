
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/make-an-order", component: () => import("pages/MakeOrder.vue") },
      { path: "/t&cs", component: () => import("pages/TermsConditions.vue") },
      { path: "/help", component: () => import("pages/HelpPage.vue") },
      { path: '/items/category/:categoryId', component: () => import('components/CategoryPage.vue') },
      { path: '/items/:itemId', component: () => import('components/ItemDetails.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]

export default routes
