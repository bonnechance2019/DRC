<script>
import { QUploaderBase, SessionStorage } from 'quasar';
import firebase from 'firebase/app';
import 'firebase/storage';
import uuid from 'uuid/v4';
import { mapActions } from 'vuex';

export default {
  name: 'myloader',
  mixins: [QUploaderBase],
  data() {
    return {
      photo: {
        type: '',
        url: ''
      }
    }
  },
  methods: {
    ...mapActions('index', ['addDownloadURL']),
    upload(type) {
      this.files.forEach((file) => {
        const ref = type + `/${uuid()}`;
        const uploadTask = firebase
          .storage()
          .ref()
          .child(ref)
          .put(file);

        uploadTask.on(
          'state_changed', 
          (sp) => {
            this.uploadSize = sp.totalBytes;
            this.uploadedSize = sp.bytesTransferred;
          },
          null,
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // console.log(downloadURL);
              
              this.photo.type = type
              this.photo.url = downloadURL
              this.addDownloadURL(this.photo)
              this.removeFile(file);
            });
          },
        );
      });
    },
  },
};
</script>
