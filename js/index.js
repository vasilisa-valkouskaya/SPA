// List of components (from components.js)
const components = {
  navbar: NavBar,
  content: Content,
  footer: Footer,
};
// List of supported routes (from pages.js)
const routes = {
  main: HomePage,
  about: About,
  contacts: Contacts,
  default: HomePage,
  error: ErrorPage,
};

/* ----- spa init module --- */
const mySPA = (function() {

  /* ------- begin view -------- */
  function ModuleView() {
    let myModuleContainer = null;
    let menu = null;
    let contentContainer = null;
    let routesObj = null;

    this.init = function(container, routes) {
      myModuleContainer = container;
      routesObj = routes;
      menu = myModuleContainer.querySelector("#mainmenu");
      contentContainer = myModuleContainer.querySelector("#content");
    }

    this.renderContent = function(hashPageName) {
      let routeName = "default";

      if (hashPageName.length > 0) {
        routeName = hashPageName in routes ? hashPageName : "error";
      }

      window.document.title = routesObj[routeName].title;
      contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
      this.updateButtons(routesObj[routeName].id);
    }

     this.updateButtons = function(currentPage) {
      const menuLinks = menu.querySelectorAll(".mainmenu__link");

      for (let i = 0, menuLinksCount = menuLinks.length; i < menuLinksCount; i++) {
        if (currentPage === menuLinks[i].getAttribute("href").slice(1)){
          menuLinks[i].classList.add("active");
        } else {
          menuLinks[i].classList.remove("active");
        }
      }
    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel () {
      let myModuleView = null;

      this.init = function(view) {
        myModuleView = view;
      }

      this.updateState = function() {
        const hashPageName = window.location.hash.slice(1).toLowerCase();
        myModuleView.renderContent(hashPageName);
      }
  }

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController () {
      let myModuleContainer = null;
      let myModuleModel = null;

      this.init = function(container, model) {
        myModuleContainer = container;
        myModuleModel = model;

        // вешаем слушателей на событие hashchange и кликам по пунктам меню
        window.addEventListener("hashchange", this.updateState);

        this.updateState(); //первая отрисовка
      }

      this.updateState = function() {
        myModuleModel.updateState();
      }
  };
  /* ------ end controller ----- */

  return {
      init: function({container, routes, components}) {
          this.renderComponents(container, components);

          const view = new ModuleView();
          const model = new ModuleModel();
          const controller = new ModuleController();

          //связываем части модуля
          view.init(document.getElementById(container), routes);
          model.init(view);
          controller.init(document.getElementById(container), model);
      },

      renderComponents: function (container, components) {
        const root = document.getElementById(container);
        const componentsList = Object.keys(components);
        for (let item of componentsList) {
          root.innerHTML += components[item].render("component");
        }
      },
  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init({
  container: "spa",
  routes: routes,
  components: components
}));

