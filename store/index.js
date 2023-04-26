// import myPlugin from 'myPlugin'

// export const plugins = [myPlugin]

export const state =() => ({
    server:{
        upload: "http://0.0.0.0:3010"
    },
    user: {
        id_user_profile: "",
        dt_reg: "",
        name: "",
        surname: "",
        patronymic:"",
        dt_birth: "",
        email: "",
        phone: "",
        sn_links: "",
        href_avatar: "",
        is_active: false,
        is_staff: false,
        skill: {
            metaSkill: {},
            hobby: {},
            keySkill: {},
        },
        workbook: {
            id_workbook: "",
            id_user_profile: "",
            id_project: "",
            name: "",
            items: [],
            dt_last_change: ""
        },
        education: [
            {
                id_education: "",
                university: "",
                subdivision: "",
                department: "",
                begin_yaer: "",
                end_yaer: "",
                level: ""
            }
        ],
        add_education: [
            {
                type: "",
                duration: "",
                university: "",
                description: "",
                diploma: ""
            }
        ],
        members: [],
        member_in_project: {
            id_user_profile: "",
            id_project: "",
            is_owner: "",
            is_favorite: ""
        },
        drafts: {}
    }
})
export const getters = {
    
}
export const mutations = {
    setUser (state, user) {
        state.user = user;
    },
    setAdd (state, add) {
        state.user.add_education = add;
    }
}
export const actions = {
    async initUser ({commit}) {
        await this.$axios.get('/portfolio')
        .then((response)=>{
            commit('setUser',response.data.user)
        });
    },
    // async 
    setAddAducat ({commit, state}, data) {
        // try {
        //     await
        //      this.$axios.post('/portfolio/add', data)
        //     .then((response)=>{
                commit('setAdd',data);
                console.log(state.user.add_education);
    //             return response.data.app_code;
    //             })
    //     } catch (e) {
    //         console.log(e);
    //         return e;
    //     }
    }
}