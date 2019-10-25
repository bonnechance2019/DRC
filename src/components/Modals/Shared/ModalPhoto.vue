<template>
  <div class="q-gutter-sm row">
    <photo-upload
      v-show="!uploaded"
      label="Custom header"
      ref="upload"
    >
      <template v-slot:header="scope">
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
        <q-btn 
          v-if="scope.canAddFiles" 
          dense 
          flat 
          icon="perm_media"
          class="text-left upload"
          style="width:100%;border-radius:0px;height:60px"
          @click="$emit('haveFile')"
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
          label="請先點擊上傳"
          icon="cloud_upload"
          style="width:100%"
          @click="$refs.upload.upload(label.type), uploaded=true" 
        />
      </template>
    </photo-upload>

    <q-icon 
      v-show="uploaded"
      name="check_circle"
      class="text-primary" style="font-size: 80px;" />
  </div>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
      uploaded: false
    }
  },
  components: {
    'photo-upload': require('src/components/Upload.vue').default
  }
}
</script>

<style>
</style>