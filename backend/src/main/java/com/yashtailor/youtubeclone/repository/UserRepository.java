package com.yashtailor.youtubeclone.repository;

import com.yashtailor.youtubeclone.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
