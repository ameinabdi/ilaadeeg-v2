import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductActions from './product.reducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import appConfig from '../../../config/app-config';

function* getProduct(api, action) {
  const { productId } = action;
  // make the call to the api
  const apiCall = call(api.getProductDetail, productId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productSuccess(response.data));
  } else {
    yield put(ProductActions.productFailure(response.data));
  }
}


 function* getProductSetup(api, action) {
  const { options } = action
  const response = yield call(api.getProductSetup);
  // success?
  if (response.ok) {
    yield put(ProductActions.productSetupSuccess(response.data))
  } else {
    yield put(ProductActions.productSetupFailure(response.data))
  }
}


function* getAllProducts(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProducts, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productAllSuccess(response.data?.rows));
  } else {
    yield put(ProductActions.productAllFailure(response.data));
  }
}

function* updateProduct(api, action) {
  const { product } = action;
  // make the call to the api
  const idIsNotNull = !(product.id === null || product.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProduct : api.createProduct, product);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productUpdateSuccess(response.data));
  } else {
    yield put(ProductActions.productUpdateFailure(response.data));
  }
}

function* soldProduct(api, action) {
  const { product } = action;
  // make the call to the api
  const apiCall = call(api.soldProduct,  product);
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    yield put(ProductActions.productSoldSuccess(response.data));
  } else {
    yield put(ProductActions.productSoldFailure(response.data));
  }
}

function* report(api, action) {
  const { report } = action;
  // make the call to the api
  const apiCall = call(api.reportProduct, report);
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    yield put(ProductActions.reportSuccess(response.data));
  } else {
    yield put(ProductActions.reportFailure(response.data));
  }
}


function* searchProducts(api, action) {
  const { query } = action;
  // make the call to the api
  const apiCall = call(api.searchProducts, query);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productSearchSuccess(response.data));
  } else {
    yield put(ProductActions.productSearchFailure(response.data));
  }
}
function* deleteProduct(api, action) {
  const { productId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProduct, productId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductActions.productDeleteSuccess());
  } else {
    yield put(ProductActions.productDeleteFailure(response.data));
  }
}

function* uploadImage(api, action) {
  const { gallery, image } = action;
  // make the call to the api
  const photos =  {
    uri : image?.uri,
    path: image?.uri,
    type: image?.type,
    name:uuidv4(),
    size: image?.fileSize,
    lastModified: image?.length,
    lastModifiedDate: new Date(),
    id: "productGallery",
    tenantId: null
  }
  const formData = new FormData();
  // make the call to the api
  const id = uuidv4();
  const filename = `${id}.${image?.fileName}`;
  const apiCall = call(api.fetchFileCredentials,{
        filename: filename,
        storageId: 'productGallery',
      },);
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    const url = response?.data.uploadCredentials.url;
    const fields = response?.data.uploadCredentials.fields
    if (fields) {
      for (const [key, value] of Object.entries(
        fields || {},
      )) {
        formData.append(key, String(value));
      }
    }
    formData.append('file',photos);
    const uploadImageResponse = yield call(api.uploadImage,url, formData);
  if(uploadImageResponse && uploadImageResponse.status === 204){
    const photo = {
      id: id,
      name:filename,
      sizeInBytes: photos.size,
      publicUrl: response?.data.uploadCredentials?.publicUrl ? response?.data.uploadCredentials?.publicUrl : null,
      privateUrl : response?.data.privateUrl,
      downloadUrl:response?.data.downloadUrl,
      new: true,
    }
    yield put(ProductActions.uploadSuccess(photo));
   yield put(ProductActions.galleryStore([...gallery, photo]));
  }else{
    yield put(ProductActions.uploadFailure("error"+response.data));
  }
  } else {
    yield put(ProductActions.uploadFailure("error"+response.data));
  }
}

export default {
  getAllProducts,
  getProduct,
  deleteProduct,
  searchProducts,
  updateProduct,
  getProductSetup,
  uploadImage,
  report,
  soldProduct
};
