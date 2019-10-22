<template>
  <div class="q-gutter-sm row">
    <photo-upload
      v-show="!uploadSuccess"
      label="Custom header"
      ref="upload"
    >
      <template v-slot:header="scope">
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
        <q-btn 
          v-if="scope.canAddFiles" 
          dense 
          flat 
          icon="add"
          class="text-left upload"
          style="width:100%;border-radius:0px;height:60px"
        >
          <q-uploader-add-trigger/>
          <div class="q-uploader__title" style="padding:10px">
            {{label.title}}
          </div>
          <q-tooltip>選擇圖片檔案</q-tooltip>
        </q-btn>
        <q-btn
          v-if="scope.canUpload"
          dense 
          flat 
          icon="cloud_upload"
          style="width:100%;border-radius:0px"
          @click="$refs.upload.upload(label.type), uploadSuccess=true"
        />
      </template>
    </photo-upload>
    <q-icon 
      v-show="uploadSuccess"
      name="check_circle"
      class="text-primary" style="font-size: 80px;" />
  </div>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
      uploadSuccess: false
    }
  },
  components: {
    'photo-upload': require('src/components/Upload.vue').default
  }
}
</script>

<style>
</style>