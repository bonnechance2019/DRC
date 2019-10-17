<template>
  <div class="q-gutter-sm row">
    <photo-upload
      label="Custom header"
      ref="upload"
      :name="label.name"
      :url="url"
      @upload="upload()"
    >
      <template v-slot:header="scope">
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
        <q-btn 
          v-if="scope.canAddFiles" 
          dense 
          flat 
          class="text-left upload"
          style="width:100%;border-radius:0px"
        >
          <q-uploader-add-trigger/>
          <div class="q-uploader__title" style="padding:10px">
            {{label.title}}
          </div>
          <q-tooltip>選擇圖片檔案</q-tooltip>
        </q-btn>
      </template>
    </photo-upload>
  </div>
</template>

<script>
export default {
  props: ['url', 'label'],
  components: {
    'photo-upload': require('src/components/Upload.vue').default
  }
}
</script>

<style>

</style>