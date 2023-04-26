<template lang="html">
  <div class="workbook">
    <div ref="$wrapper" class="tree" />
    <div class="main">
      <div class="project-filters" style="display: flex;">
        <div class="filters">
          <span> Записи </span>
          <span> Статьи </span>
          <span> О проекте </span>
        </div>
        <div style="display: flex; align-items: center;">
          <select name="filters">
            <option value="all">
              Фильтры
            </option>
            <option value="idk">
              Я не знаю
            </option>
          </select>
          <input type="text" value="">
        </div>
      </div>
      <div id="scroller" class="flex-column" style="overflow: auto; height: 80vh">
        <div v-for="(post, index) in workbook.posts" :id="post.post_id" :key="index" class="post flex-column">
          <div class="post-header">
            <span> Программирование </span>
            <span> $настройка_лшл </span>
            <span> {{ post.date }} </span>
          </div>
          <div v-html="post.content" />
          <div class="post-footer">
            <span>{{ post.author }}</span>
          </div>
        </div>
        <button @click="addNewEntry">
          Добавить запись
        </button>
        <div>
          <ckeditor :editor="editor" v-model="editorData"></ckeditor>
          <button v-on:click="emptyEditor()">Empty the editor</button>
          <h2>Editor data</h2>
          <code>{{ editorData }}</code>
          <!-- <vue-editor v-model="content" :editor-toolbar="customToolbar" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {scroller} from 'vue-scrollto/src/scrollTo'
import { mapGetters } from "vuex";
// import { VueEditor } from "vue2-editor";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as d3 from "d3";
export default {
  layout: "olimp",
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      content: "<p>Some initial content</p>",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
    };
  },
  components: {
    // VueEditor,
  },
  computed: {
    ...mapGetters({
      workbook: "workbook/getWorkbooks",
      projects: 'project/getProjects'
    }),
    id() {
      return this.$route.params.id;
    },
    project () {
      return this.projects.find(a => a.id_project.toString() === this.$route.params.id)
    },
  },
  methods: {
    addNewEntry() {
      const id = this.workbook.posts[this.workbook.posts.length-1].post_id + ""
      console.log(id.substring(1))
      const newEntry = {
              post_id: "a" + id.substring(1)+1 ,
              date: new Date(Date.now()).toISOString(),
              author: 'Иван Иванов',
              content: this.content,
              is_approved: false,
              is_published: false
            }
       this.$store.dispatch("workbook/addNew",  newEntry);
       //this.data
       this.updateChart(this.$refs.$wrapper)
    },
    updateChart(wrapper) {
      if (!wrapper) {
        return;
      }
      const margin = { top: 40, right: 10, bottom: 50, left: 10 },
        w = 350 - margin.left - margin.right,
        h = 1200 - margin.top - margin.bottom;
      let svgData = d3.select(wrapper).selectAll("svg").remove();
      svgData = d3.select(wrapper).selectAll("svg").data(["dummy data"]);
      const svg = svgData
        .enter()
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

      const timeScale1 = d3
        .scaleTime()
        .domain([new Date(this.project.dt_start), new Date()])
        .range([0, 960])

        //timeScale1.ticks(d3.timeDay.every(1));

        const timelineNodes = svg.selectAll('g')
                            .data(this.workbook.posts)
                            .enter()
                            .append('g');
        timelineNodes.append('circle')
                            .attr('cy', d => timeScale1(new Date(d.date)))
                            .attr('cx', () => w / 4)
                            .attr('r', 5)
                            .on('click', function(d, i) {
                              console.log(document.querySelector('#' + i.post_id))
                              let firstScrollTo = scroller()
                              firstScrollTo('#' + i.post_id, 500 ,{container: "#scroller"})
                            });
                            svg.append("path")
                              .datum(this.workbook.posts)
                              .attr("fill", "none")
                              .attr("stroke", "#69b3a2")
                              .attr("stroke-width", 1.5)
                              .attr("d", d3.line()
                                .x( w / 4 )
                                .y(function(d) { return timeScale1(new Date(d.date)) })
                                )
        // const gLink = svg.selectAll('circle')
        //    .data(this.workbook.posts)
        //    .enter()
        //   .append('g')
        //    console.log(gLink)
        //   gLink.append('line')
        //   .attr('fill', 'none')
        //   .attr('stroke', '#555')
        //   .attr('stroke-width', 1.5)
        //     .x(() => w / 4)
        //     .y(d => timeScale1(new Date(d.date)))
        //     .curve(d3.curveNatural)
        // .padding(0.2);
      //var yAxis = d3.axisLeft(timeScale1).ticks(10);
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate( "+ 50 + ",0 )")
        .call(d3.axisLeft(timeScale1))
    },
    emptyEditor() {
                this.editorData = '';
            }
  },
  mounted() {
    // append the svg object to the body of the page
    this.updateChart(this.$refs.$wrapper);
    let firstScrollTo = scroller()
    firstScrollTo('#' + this.workbook.posts[this.workbook.posts.length-1].post_id, 500 ,{container: "#scroller"})

  },
  async fetch ({ store, from }) {
  if (from.name !== 'project') {
    await store.dispatch('project/loadData')
  }
  }
};
</script>

<style lang="css" scoped>
.workbook {
  display: flex;
  padding: 10px;
}
.tree {
  background-color: rgb(240, 240, 240);
  width: 30%;
  height: 90vh;
  overflow: auto;
}
.main {
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.post {
  border: 1px solid #ccccff;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 30px;
}
.post-header {
  font-family: Roboto;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
}
::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #b1cfd6;
  border-left: 1px solid #a1bdf3;
}

::-webkit-scrollbar-thumb {
  background: #bcd1e9;
  border: solid 3px #98c0fd;
  border-radius: 7px;
}
::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
