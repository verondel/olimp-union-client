/* eslint-disable */
export const state = () => ({
  projects: []
});

export const getters = {
  getProjects: state => state.projects,
  getFavProjects: state => {
    return state.projects.filter(a => a.is_favorites);
  },
  authorProjects: state => {
    return state.projects.filter(a => a.owner);
  },
  participantProjects: state => {
    return state.projects.filter(a => !a.owner);
  },
  finishedProjects: state => {
    return state.projects.filter(a => a.status === 3);
  },
  stoppedProjects: state => {
    return state.projects.filter(a => a.status === 2);
  },
  runningProjects: state => {
    return state.projects.filter(a => a.status === 1);
  }
};

export const actions = {
  async unFaveProject({ commit }, project) {
    await commit("UN_FAVE_PROJECT", project);
  },
  async faveProject({ commit }, project) {
    await commit("FAVE_PROJECT", project);
  },
  async deleteProject({ commit }, project) {

    if (!project.id_project) return false;
    const url = this.$config.REST_SERVER + '/projects/' + project.id_project
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
      })
      const json = await response.json();
      console.log("json:", json)
      if (!json.data.id_project) {
        commit("DELETE_PROJECT", project);
        return true;
      }
      return false;
    }
    catch(e) {
      console.error('Во время запроса' + url + 'возникли следующие ошибки:\n' + e);
      return false;
    }


  },
  async stopProject({commit}, project) {
    await commit("STOP_PROJECT", project);
  },
  async runProject({commit}, project) {
    await commit("RUN_PROJECT", project);
  },

  // Подгружаем данные с REST сервера
  async loadData({ commit }) {

    const url = this.$config.REST_SERVER + '/projects'
    // todo: rewrite code on call REST SERVER
    //const res = await this.$axios.get("./project.json");
    const res = await this.$axios.get(url);
    console.log(res.data.data)
    const data = res.data.data;
    // console.log(res.data)
    data.forEach(function(a) {
      const date = new Date(a.last_changed)
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      a.last_changed = dt + '.' + month + ' ' + year
    });
    commit("ADD_DATA", data);
  },
  async editRpoject({ commit }, newProject) {
    try {
      const response = await fetch('http://127.0.0.1:8001/api/projects', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newProject),
        })
      const json = await response.json();
      commit("EDIT_PROJECT", newProject);
      return json;
    }
    catch(e) {
      console.error('Во время запроса возникли следующие ошибки:\n' + e);
      return [];
      
    }
  },

  // Сохраняем проект на REST
  async addNew({ commit }, newProject) {
    const url = this.$config.REST_SERVER + '/projects'
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newProject),
        })
      const json = await response.json();

      if (json.data.id_project) {
        newProject["id_project"] = json.data.id_project;
        console.log(newProject)

      }
      commit("ADD_PROJECT", newProject);
      return json.data;
    }
    catch(e) {
      console.error('Во время запроса возникли следующие ошибки:\n' + e);
      return [];

    }
  },

};

export const mutations = {
  UN_FAVE_PROJECT(state, project) {
    const pr = state.projects.find(a => a.id_project === project.id_project);
    pr.is_favorites = false;
  },
  FAVE_PROJECT(state, project) {
    const pr = state.projects.find(a => a.id_project === project.id_project);
    pr.is_favorites = true;
  },
  STOP_PROJECT(state, project) {
    const pr = state.projects.find(a => a.id_project === project.id_project);
    pr.status = 2;
  },
  RUN_PROJECT(state, project) {
    const pr = state.projects.find(a => a.id_project === project.id_project);
    pr.status = 1;
  },
  DELETE_PROJECT(state, project) {
    state.projects = state.projects.filter(
      a => a.id_project !== project.id_project
    );
  },
  ADD_DATA(state, data) {
    state.projects.forEach(function(a) {
      a.menu = true;
    });
    state.projects.forEach(function(a) {
      a.overlay = false;
    });
    state.projects = data;
  },
  ADD_PROJECT(state, newProject) {
    state.projects.push(newProject);
  },
  EDIT_PROJECT(state, newProject) {
    let pr = state.projects.find(a => a.id_project === project.id_project);
    pr = Object.assign(pr, newProject);
  }
};
