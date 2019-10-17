<script>
import { QUploaderBase, SessionStorage } from 'quasar';
import firebase from 'firebase/app';
import 'firebase/storage';
import uuid from 'uuid/v4';
import { mapActions } from 'vuex';

export default {
  name: 'myloader',
  mixins: [QUploaderBase],
  props: ['url', 'name'],
  data() {
    return {
      photo: {
        url: this.url,
        name: this.name
      }
    }
  },
  methods: {
    ...mapActions('index', ['addPhoto']),
    upload() {
      // this.files.forEach((file) => {
      //   const ref = `recipes/${uuid()}`;
      //   const uploadTask = firebase
      //     .storage()
      //     .ref()
      //     .child(ref)
      //     .put(file);

      //   uploadTask.on(
      //     'state_changed', 
      //     (sp) => {
      //       this.uploadSize = sp.totalBytes;
      //       this.uploadedSize = sp.bytesTransferred;
      //     },
      //     null,
      //     () => {
      //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //         console.log(downloadURL);
      //         this.removeFile(file);
      //       });
      //     },
      //   );
      // });
      console.log(this.photo)
      // this.addPhoto(photo) 
    },
  },
};
</script>
